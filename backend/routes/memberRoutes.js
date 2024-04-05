import express from "express";
import {
  createNewMember,
  fetchAllMembers,
  updateMember,
  fetchMemberById,
  deleteMemberById,
} from "../controllers/members.js";

const router = express.Router();

router.get("/members/all", fetchAllMembers);
router.post("/members/add", createNewMember);
router.put("/members/:id", updateMember);
router.get("/members/:id", fetchMemberById);
router.delete("/members/:id", deleteMemberById);

export default router;
