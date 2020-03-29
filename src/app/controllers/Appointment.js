import * as Yup from 'yup';
import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
  async store(req, res) {
    // const { originalname: name, filename: path } = req.file;
    // const file = await File.create({ name, path });
    // return res.json({ ok: true });
    const schema = Yup.object().shape({
      providerId: Yup.number().required(),
      date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'validation fails' });

    const { providerId, date } = req.body;

    const isProvider = await User.findOne({
      where: { id: providerId, provider: true },
    });

    if (!isProvider)
      return res
        .status(401)
        .json({ error: 'you can only create appointments with providers' });

    const appointment = await Appointment.create({
      userId: req.userId,
      providerId,
      date,
    });

    return res.json(appointment);
  }
}
export default new AppointmentController();
