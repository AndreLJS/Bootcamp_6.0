const { User } = require("../models");

class SessionController {
  async create(req, res) {
    return res.render("auth/signin");
  }

  async store(req, res) {
    const { email, password } = req.body;
    //Busca o usuário no banco de dados pelo email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash("error", "Usuário ou senha inválidos");
      return res.redirect("/");
    }
    //Comparação de senha
    if (!(await user.checkPassword(password))) {
      req.flash("error", "Usuário ou senha inválidos");

      return res.redirect("/");
    }
    req.session.user = user;

    return res.redirect("/app/dashboard");
  }
  destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie("global");
      return res.redirect("/");
    });
  }
}

module.exports = new SessionController();
