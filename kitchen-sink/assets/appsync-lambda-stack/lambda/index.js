exports.handler = async (event) => {
  const notesArray = ["note1", "note2", "note3"];

  switch (event.info.fieldName) {
    case "notes":
      return notesArray;
    case "customNote":
      return event.arguments.title;
    default:
      return null;
  }
};
