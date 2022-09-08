import StateModel from "../models/statesModel.js";

export const GetStates = async (req, res) => {
    try {
      const data = await StateModel.findAll();
      res.json({ data: data });
    } catch (error) {
      console.log(error);
    }
  };
  