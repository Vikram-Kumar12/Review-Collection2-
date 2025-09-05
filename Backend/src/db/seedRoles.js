import Role from "../models/role.models.js";

const cohortEmails = [
  "vikram8987k@gmail.com",
  // rest student email....
];
const adminEmails = [
  "vikramkumar0120arav@gmail.com",
  // rest admin email....
];

const seedRoles = async () => {
  try {
    const allEmails = [
      ...cohortEmails.map((email) => ({ email, role: "Cohort" })),
      ...adminEmails.map((email) => ({ email, role: "Admin" })),
    ];

    for (const item of allEmails) {
      const exists = await Role.findOne({ email: item.email });
      if (!exists) {
        await Role.create(item);
      }
    }
    console.log("✅ Roles seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding roles:", error);
  }
};
export default seedRoles;
