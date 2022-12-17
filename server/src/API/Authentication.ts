import Router from '../plugins/Router';
import AuthenticationService from '../services/AuthnticationService';
import JWT from '../utils/JWT';
import { Cookie } from '../models/CookieModel';

const path = '/authentication';

const cookieHeaders : Cookie = {
  maxAge: 420000,
  sameSite: "lax",
  httpOnly: true,
};

Router.post(path, async (req, res) => {
  const { body } = req;

  const user = await AuthenticationService.getUserData(body);
  if (!user) {
    res.sendStatus(401);
  } else {
    console.log({ user });
    const accessToken = JWT.generateAccessToken(user);

    res.cookie("token", accessToken, cookieHeaders);
    res.send(user);

    JWT.generateRefreshToken(user);
  }
});

Router.get(path, async (req, res) => {
  const { cookies } = req;

  if (cookies.token) {
    const data = await JWT.checkToken(cookies.token);

    if (data?.token && data?.user) {
      res.cookie('token', data.token, cookieHeaders);
      res.status(200).send(true);
    } else if (data?.user) {
      res.send(true);
    } else {
      res.send(false);
    }
    return;
  }

  res.send(false);
});

export default Router;