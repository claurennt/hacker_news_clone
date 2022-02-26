const displayNumberOfComments = (nrComments) => {
  switch (nrComments) {
    case 1:
      return `${nrComments} comment`;
    case 0:
      return "";
    default:
      return `${nrComments} comments`;
  }
};

export default displayNumberOfComments;
