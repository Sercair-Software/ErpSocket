const CarMobilityEntity = require('../entities/carMobilities')
const CarKmEntity = require('../entities/carKM')
const CarEntity = require('../entities/car')
const DateEntity = require('../entities/date')
const { default: mongoose } = require('mongoose')

exports.saveCarMobilities = async (data) => {
    if(data.length > 0 && data[0].deviceId){ //Control.
    var today = new Date();
    var date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 3)
    //Check Date. If not exists, create today's Date.
    var DateValue = await DateEntity.findOne({Date: date})
    if(!DateValue){
        var model = await new DateEntity({
            Date: date
        })
        await model.save();
        DateValue = model;
    }
    await data.map(async(element)=> {
        var Car = await CarEntity.findOne({plaka: element.plate});
        if(Car)
        {
        //Check KM For today, if not exists create one.
        var checkKmForToday = await CarKmEntity.findOne({$and: [{CarId: mongoose.Types.ObjectId(Car._id)}, {DatesId: mongoose.Types.ObjectId(DateValue._id)}]});
        let KmInformation = Math.round(element.distance * element.distanceMultiplier);
        if (!checkKmForToday){
            var KMmodel = await new CarKmEntity({
                DatesId: mongoose.Types.ObjectId(DateValue._id),
                CarId: mongoose.Types.ObjectId(Car._id),
                KM: KmInformation
            })
            await KMmodel.save();
        }
        else if(checkKmForToday.KM != KmInformation){
            await checkKmForToday.updateOne({KM: KmInformation});
        }
        var LastRecordOfCarMobility = await CarMobilityEntity.findOne({CarId: mongoose.Types.ObjectId(Car._id)})
            .sort({_id:-1})
        if((!LastRecordOfCarMobility || (LastRecordOfCarMobility && (LastRecordOfCarMobility.latitude != element.latitude || LastRecordOfCarMobility.longitude != element.longitude)))){
            var mobilityEntity = await new CarMobilityEntity(element);
            mobilityEntity.CarId= mongoose.Types.ObjectId(Car._id);
            mobilityEntity.DatesId= mongoose.Types.ObjectId(DateValue._id);
            await mobilityEntity.save();
        }
    }
    })
    console.log("Araç Takip Dataları Başarıyla Kaydedildi. Tarih: "+ today)
    return true;
}
console.log("Araç Takip Dataları Kaydedilirken Hata Oluştu. Hatalı Data: " + data + " , Tarih: "+ today)
return false;
}