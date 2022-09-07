import PackageModel from "../models/packageModel.js";
import PackagesStatesModel from "../models/packagesStatesModel.js";
import StaffModel from "../models/staffModel.js";
import StateModel from "../models/statesModel.js";

export const GetPackageStates = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await PackagesStatesModel.findAll({
      where: { id_paquetes: id },
      include: [
        //   { model: PackageModel },
        //   { model: StateModel },
        //   { model: StaffModel },
      ],
    });
    console.log(data);
    res.json({ data });
  } catch (error) {
    console.log(error);
  }
};
