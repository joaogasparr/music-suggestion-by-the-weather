import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string('Name must be string').required('Name is required'),
      email: Yup.string('Email must be string')
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string('Password most be string')
        .required('Password is required')
        .min(6, 'Password must be greater than or equal to 6 characters'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(401).json({ error: err.errors, details: err.inner });
  }
};
