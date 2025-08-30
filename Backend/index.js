import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import "dotenv/config";
import Role from "./src/models/role.models.js"
import seedRoles from "./src/db/seedRoles.js"
const PORT = process.env.PORT || 8000;
connectDB().then(async () => {
  app.listen(PORT, () =>
    console.log(`Server started at PORT: http://localhost${PORT}`),
  );

  const roleCount = await Role.countDocuments();
  // console.log("roleCount :", roleCount);
  if (roleCount === 0) await seedRoles(); // sirf pehli baar chalega
});
