const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PeriodTimesSchema = new Schema(
  {
    restaurantId: {
      type: mongoose.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    periodIds: {
      type: [mongoose.Types.ObjectId],
      ref: 'PeriodEnums',
      required: true,
    },
    // periodTimes: {
    //   type: [String],
    // },
  },
  { versionKey: false, collection: 'PeriodTimes' }
)

const PeriodTimes = mongoose.model('PeriodTimes', PeriodTimesSchema)

module.exports = PeriodTimes

// const PeriodTimesSchema = new Schema({
//   restaurantId: {
//     type: mongoose.Types.ObjectId,
//     ref: 'Restaurant',
//     required: true,
//   },
//   periodIds: [{
//     type: mongoose.Types.ObjectId,
//     ref: 'PeriodEnums',
//     required: true,
//   }],
// }, { versionKey: false, collection: 'PeriodTimes' });

// // Virtual to populate periodTimes
// PeriodTimesSchema.virtual('periodTimes').get(async function () {
//   const periods = await PeriodEnum.find({ _id: { $in: this.periodIds } });

//   return periods.map(period => ({
//     periodName: period.periodName,
//     timeSlots: generateTimeSlots(period.startTime, period.endTime),
//   }));
// });

// // Pre-save hook to ensure periodIds are converted to ObjectId
// PeriodTimesSchema.pre('save', async function (next) {
//   if (this.periodIds && this.periodIds.length > 0 && this.periodIds[0].constructor !== mongoose.Types.ObjectId) {
//     this.periodIds = this.periodIds.map(id => mongoose.Types.ObjectId(id));
//   }
//   next();
// });

// // Function to generate time slots
// function generateTimeSlots(startTime, endTime) {
//   const timeSlots = [];
//   let currentTime = parseTime(startTime);

//   while (currentTime <= parseTime(endTime)) {
//     timeSlots.push(formatTime(currentTime));
//     currentTime = addMinutes(currentTime, 30);
//   }

//   return timeSlots;
// }

// // Helper function to parse time string
// function parseTime(timeString) {
//   const [hours, minutes] = timeString.split(':').map(Number);
//   return new Date(0, 0, 0, hours, minutes);
// }

// // Helper function to format time
// function formatTime(time) {
//   return time.toTimeString().slice(0, 5);
// }

// // Helper function to add minutes to time
// function addMinutes(time, minutes) {
//   return new Date(time.getTime() + minutes * 60000);
// }

// // Model for Period Times
// const PeriodTimes = mongoose.model('PeriodTimes', PeriodTimesSchema);

// module.exports = PeriodTimes;
