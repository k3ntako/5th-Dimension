const parseBookInfo = ( vInfo ) => {
  let newVInfo = [];

  vInfo.authors && newVInfo.push({
    title: "By",
    info: `${vInfo.authors.join(", ")}`,
  });

  vInfo.publisher && newVInfo.push({
    title: "Publisher",
    info: vInfo.publisher,
  });

  vInfo.publishedDate && newVInfo.push(
    parseDate( vInfo.publishedDate )
  );

  vInfo.pageCount && newVInfo.push({
    title: "Page Count",
    info: vInfo.pageCount + " pages",
  });

  if( vInfo.industryIdentifiers ){
    vInfo.industryIdentifiers.forEach(idnt => {
      idnt.type && idnt.identifier && newVInfo.push({
        title: idnt.type.replace(/_/g, " "),
        info: idnt.identifier,
      });
    });
  }

  if( vInfo.categories && vInfo.categories.length ){
    const categoryTitle = vInfo.categories.length < 2 ? "Category" : "Categories";
    const categories = vInfo.categories.join(", ");

    newVInfo.push({
      title: categoryTitle,
      info: categories,
    });
  }

  return newVInfo;
}

const parseDate = ( vInfoDate ) => {
  const validDateFormat = vInfoDate && /^((\d){4}-(\d){2}-(\d){2})$/.test(vInfoDate);

  if( vInfoDate && validDateFormat ){
    const dateSplit = vInfoDate.split("-");
    const publishedDate = new Date(Date.UTC(dateSplit[0], dateSplit[1], dateSplit[2], 12));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return {
      title: "Published",
      info: publishedDate.toLocaleDateString('en-US', options),
    };
  }else if( vInfoDate && !validDateFormat ){
    return {
      title: "Published",
      info: vInfoDate,
    };
  }

  return null;
}

module.exports = {
  parseBookInfo,
}
