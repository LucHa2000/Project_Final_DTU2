const authMiddlewares = require('../app/middlewares/AuthMiddlewares');
const siteRouter = require('./site');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const doctorRouter = require('./doctor');
const callVideoRouter = require('./callVideo');
const inboxRouter = require('./inbox');
const paymentRouter = require('./payment');
const userRouter = require('./user');
const accountRouter = require('./account');
const bookingRouter = require('./booking');
const jobRouter = require('./job');
const scheduleRouter = require('./schedule');
const clinicRouter = require('./clinic');

function router(app) {
  app.use(
    '/admin',
    authMiddlewares.checkAccount,
    authMiddlewares.checkRoleAdmin,
    authMiddlewares.addInfoAuthencation,
    adminRouter
  );
  app.use('/account', authMiddlewares.checkAccount, authMiddlewares.checkRoleAdmin, accountRouter);
  app.use('/clinic', authMiddlewares.checkAccount, authMiddlewares.checkRoleAdmin, clinicRouter);
  app.use(
    '/doctor',
    authMiddlewares.checkAccount,
    authMiddlewares.checkRoleDoctor,
    authMiddlewares.addInfoAuthencation,
    doctorRouter
  );
  app.use('/payment', authMiddlewares.checkAccount, authMiddlewares.checkRoleUser, paymentRouter);
  app.use(
    '/callVideo',
    authMiddlewares.checkAccount,
    authMiddlewares.addInfoAuthencation,
    callVideoRouter
  );
  app.use('/inbox', authMiddlewares.checkAccount, authMiddlewares.addInfoAuthencation, inboxRouter);
  app.use('/auth', authRouter);
  app.use(
    '/user',
    authMiddlewares.checkAccount,
    authMiddlewares.checkRoleUser,
    authMiddlewares.addInfoAuthencation,
    userRouter
  );
  app.use(
    '/booking',
    authMiddlewares.checkAccount,
    authMiddlewares.checkRoleUser,
    authMiddlewares.addInfoAuthencation,
    bookingRouter
  );
  app.use(
    '/schedule',
    authMiddlewares.checkAccount,
    authMiddlewares.checkRoleUser,
    authMiddlewares.addInfoAuthencation,
    scheduleRouter
  );
  app.use(
    '/job',
    authMiddlewares.checkAccount,
    authMiddlewares.checkRoleDoctor,
    authMiddlewares.addInfoAuthencation,
    jobRouter
  );
  app.use('/', authMiddlewares.addInfoAuthencation, siteRouter);
}
module.exports = router;
