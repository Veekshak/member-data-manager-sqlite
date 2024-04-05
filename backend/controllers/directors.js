import Members from "../models/member.js";

export async function fetchAllDirectors(req, res) {
  try {
    const rows = await Members.findAll({
      attributes: ["name", "dir"],
      where: {
        cur_state: "director",
      },
      order: [["id", "ASC"]],
    });
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error Fetching Data:", error);
    return res.status(500).json({ error: "Error fetching Data" });
  }
}
