// import { host, port } from "../../../backend/app.js";

// console.log(`Will be connecting to Backend via http://${host}:${port}`)

const host = "localhost"; 
const port = 3000;

export async function fetchAllMembersData() {
  const response = await fetch(`http://${host}:${port}/members/all`);
  if (!response.ok) {
    const error = new Error("Failed to fetch member data");
    error.code = response.status;
    error.info = response.json();
    throw error;
  }

  const memberData = await response.json();

  return memberData;
}
export async function fetchAllDirectorsData() {
  const response = await fetch(`http://${host}:${port}/directors/all`);
  if (!response.ok) {
    const error = new Error("Failed to fetch director data");
    error.code = response.status;
    error.info = response.json();
    throw error;
  }

  const memberData = await response.json();

  return memberData;
}
export async function fetchMemberById({ signal, id }) {
  const response = await fetch(`http://${host}:${port}/members/${id}`, {
    signal: signal,
  });
  if (!response.ok) {
    const error = new Error("Failed to fetch member data");
    error.code = response.status;
    error.info = response.json();
    throw error;
  }

  const memberData = await response.json();

  return memberData;
}
export async function deleteMemberById({ signal, id }) {
  const response = await fetch(`http://${host}:${port}/members/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = new Error("Failed to delete member data");
    error.code = response.status;
    error.info = response.json();
    throw error;
  }

  return response.json();
}

export async function createNewMember(memberData) {
  console.log(JSON.stringify(memberData));
  const response = await fetch(`http://${host}:${port}/members/add`, {
    method: "POST",
    body: JSON.stringify(memberData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("Error occured while submitting");
    error.code = response.status;
    error.info = response.json();
    throw error;
  }

  return response.json();
}
export async function updateMember(memberData) {
  const id = memberData.id;
  console.log(JSON.stringify(memberData));
  const response = await fetch(`http://${host}:${port}/members/${id}`, {
    method: "PUT",
    body: JSON.stringify(memberData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("Error occured while submitting");
    error.code = response.status;
    error.info = response.json();
    throw error;
  }

  return response.json();
}
