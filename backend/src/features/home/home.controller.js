import HomeRepository from "./home.repository.js";
import { userSchema } from "../user/user.schema.js";


const homeRepository = new HomeRepository();

export default class HomeController {
  async getAllScannedUsers(req, res) {
  try {
    const userId = req.user.id;
    const scannedUsers = await homeRepository.findAllByUser(userId);
    res.json(scannedUsers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch scanned users." });
  }
}



  async saveScannedUser(req, res) {
  try {
    const { email, name, phone, companyName, companyNumber, companyAddress } = req.body;
    const userId = req.user.id;
    console.log("Saving scanned user:", req.body);

    const exists = await homeRepository.findByEmailAndUser(email, userId);
    if (exists) {
      return res.status(200).json({ message: "User already saved." });
    }

    await homeRepository.save({ email, name, phone, companyName, companyNumber, companyAddress, scannedBy: userId });
    res.status(201).json({ message: "Scanned user saved successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save scanned user." });
  }
}

// async saveScannedUser(req, res) {
//   try {
//     const { scannedUserId } = req.body;
//     const userId = req.user.id;

//     if (!scannedUserId) {
//       return res.status(400).json({ error: "scannedUserId is required" });
//     }

//     const exists = await homeRepository.findByScannedUserId(scannedUserId, userId);
//     if (exists) {
//       return res.status(200).json({ message: "User already saved.", data: exists });
//     }

//     const savedUser = await homeRepository.saveScannedUserById(scannedUserId, userId);
//     return res.status(201).json({ message: "Scanned user saved successfully.", data: savedUser });

//   } catch (err) {
//     console.error("Error saving scanned user:", err);
//     res.status(500).json({ error: "Failed to save scanned user." });
//   }
// }

// async scan(req, res) {
//     try {
//       const { email } = req.body;
//       const token = req.headers.authorization?.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const userId = decoded.id;

//       if (!email) return res.status(400).json({ error: "Email is required." });

//       const existing = await HomeRepository.findByUserAndEmail(userId, email);
//       if (existing) return res.status(200).json({ message: "Already scanned" });

//       const scannedUser = await userSchema.findOne({ email }).select("-password -__v");
//       if (!scannedUser) return res.status(404).json({ error: "User not found" });

//       const result = await HomeRepository.saveScan(userId, scannedUser);
//       return res.status(201).json(result);
//     } catch (err) {
//       console.error("Scan Error:", err);
//       return res.status(500).json({ error: "Scan failed" });
//     }
//   }

//   async getAll(req, res) {
//     try {
//       const token = req.headers.authorization?.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const userId = decoded.id;

//       const scans = await HomeRepository.getByUser(userId);
//       return res.status(200).json(scans);
//     } catch (err) {
//       console.error("Get All Error:", err);
//       return res.status(500).json({ error: "Fetching failed" });
//     }
//   }

  async deleteByEmail(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      const { email } = req.params;

      const deleted = await HomeRepository.deleteByEmail(userId, email);
      if (!deleted) return res.status(404).json({ error: "User not found" });

      return res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
      console.error("Delete Error:", err);
      return res.status(500).json({ error: "Deletion failed" });
    }
  }

}
