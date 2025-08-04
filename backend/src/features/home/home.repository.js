import HomeModel from "./home.schema.js";

export default class HomeRepository {
  
  async save(data) {
    const homeUser = new HomeModel(data);
    return await homeUser.save();
  }

  async findAllByUser(userId) {
  return await HomeModel.find({ scannedBy: userId });
}

async findByEmailAndUser(email, userId) {
  return await HomeModel.findOne({ email, scannedBy: userId });
}

// async findByScannedUserId(scannedUserId, scannedBy) {
//   const user = await mongoose.model("User").findById(scannedUserId).lean();
//   if (!user) return null;

//   return await HomeModel.findOne({ scannedBy, email: user.email });
// }

// async saveScannedUserById(scannedUserId, scannedBy) {
//   const user = await mongoose.model("User").findById(scannedUserId).lean();
//   if (!user) throw new Error("User not found");

//   const newEntry = new HomeModel({
//     name: user.name,
//     email: user.email,
//     phone: user.phone,
//     companyName: user.companyName,
//     companyNumber: user.companyNumber,
//     companyAddress: user.companyAddress,
//     scannedBy,
//   });

//   return await newEntry.save();
// }

// async findByUserAndEmail(userId, email) {
//     return await HomeModel.findOne({ user: userId, "scannedUser.email": email });
//   }

//   async saveScan(userId, scannedUserData) {
//     const newScan = new HomeModel({
//       user: userId,
//       scannedUser: scannedUserData,
//     });
//     return await newScan.save();
//   }

//   async getByUser(userId) {
//     return await HomeModel.find({ user: userId });
//   }

  async deleteByEmail(userId, email) {
    return await HomeModel.findOneAndDelete({
      user: userId,
      "scannedUser.email": email,
    });
  }

}
