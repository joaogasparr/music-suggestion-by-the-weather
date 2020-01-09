import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string('Name must be string'),
      email: Yup.string('Email must be string').email('Invalid email format'),
      oldPassword: Yup.string('Old password must be string').min(
        6,
        'Old password must be greater than or equal to 6 characters'
      ),
      password: Yup.string('Password must be string')
        .min(6, 'Password must be greater than or equal to 6 characters')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required('Password is required') : field
        ),
      confirmPassword: Yup.string('Confirm password must be string')
        .min(
          6,
          'Confirm password must be greater than or equal to 6 characters'
        )
        .when('password', (password, field) =>
          password
            ? field
                .required('Confirm password is required')
                .oneOf([Yup.ref('password')])
            : field
        ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(401).json({ error: err.errors, details: err.inner });
  }
};
