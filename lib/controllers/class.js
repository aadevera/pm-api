const Class = require('mongoose').model('Classes');
const User = require('mongoose').model('Users')
const randomString = require ('randomstring');

module.exports = {
    findAll: async (req, res) => {
        try {
            const userId = req.params.userid;
            const user = await User.findById({ _id: userId });
            // same //const test = await User.findById({ _id: userId }).exec();
            const promises = user.classes.map(id => Class.findById({ _id: id }).exec() );
            const allClasses = await Promise.all(promises);
            //console.log(allClasses)
            console.log('Success: Class')
            return res.status(200).json ({
                success: true,
                classes: allClasses
            })
        } 
        
        catch(e) {
            return res.status(400).json ({
                success: true,
                message: 'Error getting all classes.'
            })
        }         
    },
    findById: async (req, res) => {
        const classId = req.params.classid;
        try {
            const doesClassExist = await Class.findById ({ _id: classId })
            console.log('FIND BY ID CLASS SUCCESS')
            return res.status(200).json({
                success: true,
                data: doesClassExist
            })
        } catch (e) {
            return res.status(400).json({
                success: false,
                message: 'Class Does Not Exist'
            })
        }
        
    },
    add: (req, res) => {
        const userId = req.params.userid;
        // TODO CHECK IF CLASSCODE IS REPEATED
        const data = {
            title: req.body.title,
            section: req.body.section,
            setting: req.body.setting,
            classcode: req.body.classcode,
            posts: [],
            adminid: req.body.adminid,
            adminname: req.body.adminname, 
            students: []
        }
        const newClass = new Class(data);
        newClass.save((err, item) => {
            if (err) { 
                return res.status(403).json({
                    success: false, 
                    message: 'Error Adding Class'
                }); 
            }
            else {

                User.update({ _id: userId }, { $push: {classes: item._id} }, (err, user) => {
                    if (err) return res.status(403).json ({
                        success: false
                    })
                    else {
                        return res.json({
                            success: true,
                            message: 'Class added successfully'
                        })
                    }        
                });
            }
        });

        
    },
    join: async (req, res) => {
        const userId = req.params.userid;

        const data = {
            classCode: req.body.classcode
        }
        try {
            // if class exists
            const existClass = await Class.findOne({ classcode: data.classCode }).exec()
            // if user Exists
            const existUser = await User.findById({ _id: userId }).exec()
            //push class to user's data
            const pushStudent = await Class.update({ _id: existClass._id }, { $push: { students: userId }})
            const pushClass = await User.update({ _id: userId }, { $push: { classes: existClass._id } })

            return res.status(200).json ({
                success: true,
                message: 'Successfully Joined Class!'
            })
        } catch (e) {
            return res.status(400).json ({
                success: true,
                message: 'Error Joining Class'
            }) 
        }
        
        
        

    },
    delete: (req, res) => {
        const _id = req.body._id;
    
        Class.remove({ _id }, (err) => {
            if (err) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
    },
    edit: (req, res) => {
        const _id = req.body._id;
        Class.findOneAndUpdate({ _id }, req.body , (err, item) => {
            if (err) {
            } else {
                res.json (item)
            }
        });
    }
}