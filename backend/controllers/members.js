import Members from "../models/member.js";

export async function createNewMember(req, res) {
  const { data } = req.body;
  console.log(data);

  if (!data) {
    return res.status(400).json({ message: "Data is required" });
  }
  const { id, name, phone_number, cur_state } = data;

  if (
    !String(id)?.trim() ||
    !name?.trim() ||
    !String(phone_number)?.trim() ||
    !cur_state?.trim()
  ) {
    return res.status(400).json({ message: "Invalid data provided." });
  }

  data.phone_number = String(data.phone_number);

  try {
    const member = await Members.create(data);
    console.log("Member created:", member.toJSON());
    return res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error creating Member:", error);
    return res.status(500).json({ error: "Error creating Member" });
  }
}

export async function fetchAllMembers(req, res) {
  try {
    const rows = await Members.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error Fetching Data:", error);
    return res.status(500).json({ error: "Error fetching Data" });
  }
}

export async function updateMember(req, res) {
  const Id = req.params.id;
  const { data } = req.body;
  console.log(data);

  if (!data) {
    return res.status(400).json({ message: "Data is required" });
  }
  const { id, name, phone_number, cur_state } = data;

  if (
    !String(id)?.trim() ||
    !name?.trim() ||
    !String(phone_number)?.trim() ||
    !cur_state?.trim()
  ) {
    return res.status(400).json({ message: "Invalid data provided." });
  }

  try {
    const member = await Members.update(data, {
      where: {
        id: Id,
      },
    });
    console.log("Member Edited successfully");
    return res.status(200).json({ message: "Member Edited successfully" });
  } catch (error) {
    console.error("Error updating Member:", error);
    return res.status(500).json({ error: "Error updating Member" });
  }
}

export async function fetchMemberById(req, res) {
  try {
    const { id } = req.params;
    const rows = await Members.findAll({
      where: {
        id,
      },
    });
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error Fetching Data:", error);
    return res.status(500).json({ error: "Error fetching Data" });
  }
}
export async function deleteMemberById(req, res) {
  try {
    const { id } = req.params;
    const info = await Members.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "Member Deleted successfully" });
  } catch (error) {
    console.error("Error Deleting Data:", error);
    return res.status(500).json({ error: "Error deleting Data" });
  }
}

// export async function createNewMember(req, res) {
//   const { data } = req.body;

//   if (!data) {
//     return res.status(400).json({ message: "Data is required" });
//   }

//   const { id, name, address, phone_number, father_name, date, cur_state, dir } =
//     data;

//   if (
//     !id?.trim() ||
//     !name?.trim() ||
//     !phone_number?.trim() ||
//     !cur_state?.trim()
//   ) {
//     return res.status(400).json({ message: "Invalid data provided." });
//   }

//   try {
//     const member = new Members(
//       id,
//       name,
//       address,
//       phone_number,
//       father_name,
//       date,
//       cur_state,
//       dir
//     );
//     const [data] = await member.save();
//     console.log(data);
//     return res.status(200).json({ message: "Data saved successfully", data });
//   } catch (error) {
//     console.error("Error Saving Data:", error);
//     return res.status(500).json({ error: "Error saving Data" });
//   }
// }

// export async function updateMember(req, res) {
//   const Id = req.params.id;
//   const { data } = req.body;
//   console.log(data);
//   if (!data) {
//     return res.status(400).json({ message: "Data is required" });
//   }

//   const { id, name, address, phone_number, father_name, date, cur_state, dir } =
//     data;

//   if (
//     !id?.trim() ||
//     !name?.trim() ||
//     !phone_number?.trim() ||
//     !cur_state?.trim()
//   ) {
//     return res.status(400).json({ message: "Invalid data provided." });
//   }

//   try {
//     const member = new Members(
//       id,
//       name,
//       address,
//       phone_number,
//       father_name,
//       date,
//       cur_state,
//       dir
//     );
//     const [data] = await member.updateById(Id);
//     console.log(data);
//     return res.status(200).json({ message: "Data saved successfully", data });
//   } catch (error) {
//     console.error("Error Saving Data:", error);
//     return res.status(500).json({ error: "Error saving Data" });
//   }
// }
