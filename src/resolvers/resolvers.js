const ObjectID = require("mongodb").ObjectId;

const resolvers = {
  Query: {
    students: async (parent, args, { studentModel }) => {
      return await studentModel.find({}).toArray();
    },
    student: async (parent, args, { studentModel }) => {
      return await studentModel.findOne({ id: args.id });
    },
    classes: async (parent, args, { classModel }) => {
      return await classModel.find({}).toArray();
    },
    class: async (parent, args, { classModel }) => {
      return await classModel.findOne({ id: args.id });
    },
  },
  Student: {
    class: async (parent, args, { classModel }) => {
      return await classModel.findOne({ id: parent.classId });
    },
  },
  Class: {
    students: async (parent, args, { studentModel }) => {
      return await studentModel.find({ classId: parent.id }).toArray();
    },
  },
  Mutation: {
    createStudent: async (parent, args, { studentModel }) => {
      const newStudent = {
        id: ObjectID().toString(),
        name: args.name,
        age: args.age,
        classId: args.classId,
      };
      await studentModel.insertOne(newStudent);
      return newStudent;
    },
    createClass: async (parent, args, { classModel }) => {
      const newClass = {
        id: ObjectID().toString(),
        name: args.name,
      };
      await classModel.insertOne(newClass);
      return newClass;
    },
  },
};

module.exports = resolvers;
