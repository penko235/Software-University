const User = require('../users/User');
const Model = require('./Model');

module.exports = {
    get: {
        createCourse(req, res, next) {
            res.render('theaters/create-theaters.hbs', {
                isLoggedIn: req.user !== undefined,
                username: req.user ? req.user.username : ''
            });
        },
        detailsCourse(req, res, next) {
            const { id } = req.params;

            Model.findById(id).populate('UsersLiked').lean().then((theater) => {
                res.render('theaters/details-theaters.hbs', {
                    isLoggedIn: req.user !== undefined,
                    username: req.user ? req.user.username : '',
                    theater,
                    isCreator: JSON.stringify(req.user._id) === JSON.stringify(course.creator),
                    imAlreadyIn: JSON.stringify(course.enrolledUsers).includes(JSON.stringify(req.user._id))
                });
            });
        },
        enrollCourse(req, res, next) {
            const { id } = req.params;
            const { _id } = req.user;

            Promise.all([
                Model.updateOne({ _id: id }, { $push: { enrolledUsers: _id } }),
                User.updateOne({ _id }, { $push: { enrolledCourses: id } })
            ]).then(([updatedCourse, updatedUser]) => {
                res.redirect(`/course/details/${id}`);
            })
        },
        deleteCourse(req, res, next) {
            const { id } = req.params;

            Model.deleteOne({ _id: id })
                .then((deletedCourse) => {
                    res.redirect('/home/');
                })
        },
        editCourse(req, res, next) {
            const { id } = req.params;

            Model.findById(id).lean().then((course) => {
                res.render('courses/edit-course.hbs', {
                    isLoggedIn: req.user !== undefined,
                    username: req.user ? req.user.username : '',
                    course
                });
            });
        }
    },
    post: {
        createCourse(req, res, next) {
            const {
                title,
                description,
                imageUrl,
                isPublic: isChecked
            } = req.body;

            const isPublic = isChecked === 'on' ? true : false;
            const createdAt = (new Date() + '').slice(0, 24);
            const creator = req.user._id;

            if (title.length > 0) {

                if (description.length > 0) {

                    if (imageUrl.length > 0) {

                        Model.create({
                            title,
                            description,
                            imageUrl,
                            isPublic,
                            createdAt,
                            UserLiked,
                            creator
                        }).then((createdCourse) => {
                            res.redirect('/home/');
                        })

                    } else {
                        res.render('theater/create-course', {
                            message: 'The imageUrl should not be empty'
                        })
                    }

                } else {
                    res.render('courses/create-course', {
                        message: 'The description should not be empty'
                    })
                }

            } else {
                res.render('courses/create-course', {
                    message: 'The title should not be empty'
                });
            }
        },

        editCourse(req, res, next) {
            const { id } = req.params;
            const {
                title,
                description,
                imageUrl,
                isPublic: isChecked
            } = req.body;

            const isPublic = isChecked === 'on' ? true : false;

            if (title.length > 0) {

                if (description.length > 0) {

                    if (imageUrl.length > 0) {

                        Model.findByIdAndUpdate(id, {
                            title,
                            description,
                            imageUrl,
                            isPublic
                        }).then((editedCourse) => {
                            res.redirect(`/course/details/${id}`);
                        })

                    } else {
                        res.render('courses/edit-course', {
                            message: 'The imageUrl should not be empty'
                        })
                    }

                } else {
                    res.render('courses/edit-course', {
                        message: 'The description should not be empty'
                    })
                }

            } else {
                res.render('courses/edit-course', {
                    message: 'The title should not be empty'
                });
            }

        }
    }
}
