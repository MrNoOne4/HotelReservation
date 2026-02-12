import { prisma } from './lib/prisma'

    async function main() {
    const student = await prisma.studenttable.create({
    data: {
        studentName: 'Alice',
        studentAGE: 20,
        studentGrade: 'A',
    },
    });

    console.log('Created student:', student);

    const allStudents = await prisma.studenttable.findMany();
    console.log('All students:', allStudents);

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })