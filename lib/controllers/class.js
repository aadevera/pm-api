const Class = require('mongoose').model('Classes');
const User = require('mongoose').model('Users');
const Post = require('mongoose').model('Posts');
const Comment = require('mongoose').model('Comments');
const mongoose = require('mongoose')
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
    findAllStudents: async (req, res) => {
        const classid = req.params.classid;
        try {   
            const getClass = await Class.findById ({_id: classid})
            
            const getStudents = getClass.students.map(student => User.findById (
                { _id: mongoose.Types.ObjectId(student) }))
            const allStudents = await Promise.all(getStudents);
            return res.status(200).json({
                success:true,
                data: allStudents
            })
        }catch (e) {
            throw new Error(e)
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
    delete: async (req, res) => {
        const classid = req.body.classid;
        const clearUser = await User.update(
            { classes: mongoose.Types.ObjectId(classid) }, 
            { $pullAll: {classes: [mongoose.Types.ObjectId(classid)]}},
            { multi: true})
        const removeClass = await Class.remove ({ _id: mongoose.Types.ObjectId(classid) })
        
        return res.status(200).json({
            success: true,
            message: 'Successfully Deleted'
        })
    },
    unjoin: async (req, res) => {
        const classid = req.body.classid;
        const userid = req.body.userid;
        await Class.update(
            {_id: mongoose.Types.ObjectId(classid)}, 
            {$pullAll: { students: [mongoose.Types.ObjectId(userid)] }},
            {multi: true}
        )
        await User.update (
            {_id: mongoose.Types.ObjectId(userid)},
            {$pullAll: { classes: [mongoose.Types.ObjectId(classid)] }},
            {multi: true}
        )
        return res.status(200).json({
            success: true,
            message: 'Successfully Unjoined'
        })

    },
    edit: async (req, res) => {
        const classid = req.body.classid;
        const data = {
            title: req.body.title,
            section: req.body.section,
            setting: req.body.setting
        }
        try {
            await Class.findOneAndUpdate({ _id: classid }, data)
            return res.status(200).json({
                success: true,
                message: 'Successfully updated Class Settings!'
            })
        } catch (e) {
            throw new Error(e)
        }
        
        
    }
}