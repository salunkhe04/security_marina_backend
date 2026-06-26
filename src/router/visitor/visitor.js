import { Router } from "express";
import { successRes2 } from "../../middlewares/response.js";
import visitorModel from "../../model/visitor.model.js";

const visitor = Router();

visitor.post("/add-visitor", async (req, res) => {
  const body = req.body;

  const {
    name,
    phoneNumber,
    purpose,
    checkInTime,
    checkInPhoto,
    unitNo,
    type,
    peopleCount,
    wing,
    project,
  } = body;
  try {
    if (!name) return errorRes2(res, 403, "name is required");
    if (!phoneNumber) return errorRes2(res, 403, "Phone number is required");
    if (!checkInTime) return errorRes2(res, 403, "Check in time is required");
    if (!checkInPhoto) return errorRes2(res, 403, "Check in photo is required");
    if (!peopleCount) return errorRes2(res, 403, "Count is required");

    const newVisitor = await visitorModel.create({ ...body });

    await newVisitor.save();

    return successRes2(res, 200, `Visitor Added `, { data: newVisitor });
  } catch (error) {
    return errorRes2(res, 403, "Server Error", error);
  }
});

visitor.get("/visitors", async (req, res) => {
  try {
    let query = req.query.query || "";
    let project = req.query.project;
    const isNumberQuery = !isNaN(query);
    let searchFilter = {
      $or: [
        { name: { $regex: query, $options: "i" } },

        isNumberQuery ? { phoneNumber: Number(query) } : null,
      ].filter(Boolean),

      ...(project != null ? { project: project } : null),
    };

    const user = await visitorModel.find(searchFilter).sort({
      createdAt: -1,
    });

    return successRes2(res, 200, "Get Marina Bay Visitors", { data: user });
  } catch (error) {
    return errorRes2(res, 500, "Internal Server Error", error);
  }
});

visitor.post("/visitor-check-out/:id", async (req, res, next) => {
  const { checkOutTime, checkOutPhoto } = req.body;
  const { id } = req.params;
  try {
    if (!id) return errorRes2(id, 401, "id Required");
    if (!checkOutTime) return errorRes2(res, 401, "time is Required");
    if (!checkOutPhoto) return errorRes2(res, 401, "check photo Required");

    const existingResp = await visitorModel.findById(id);

    if (!existingResp) return errorRes2(res, 404, "Not Found");

    const resp = await visitorModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true },
    );

    return successRes2(res, 200, "Updated Successfully", { data: resp });
  } catch (error) {
    return errorRes2(res, 500, "Internal Server Error");
  }
});

export default visitor;
