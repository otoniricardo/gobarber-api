import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists)
      return res.status(400).json({ error: 'Email already in use' });

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    // return res.json({ ok: true });
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });
      if (userExists)
        return res.status(400).json({ error: 'Email already in use' });
    }

    if (oldPassword && !(await user.checkpassowd(oldPassword)))
      return res.status(401).json({ error: 'wrong passord' });

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, provider });
  }
}
export default new UserController();
