export const getSuggests = ({ noteList }, search) => {
  const suggests = noteList.filter(({ title }) => search === title);
  return suggests;
};
