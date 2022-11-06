const contacts = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsAll = await contacts.listContacts();
      console.table(contactsAll);
      break;

    case "get":
      const contactById = await contacts.getContactById(id);
      console.log(contactById);
      break;

    
    case "add":
      await contacts.addContact(name, email, phone);
      console.log(`Записали новий контакт ${name}!`);
      console.table(await contacts.listContacts());
      break;

    case "remove":
      await contacts.removeContact(id);
      console.log(`Удалили контакт с id: ${id}`);
      console.table(await contacts.listContacts());
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);