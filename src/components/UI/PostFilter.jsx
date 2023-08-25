import React from "react";
import MyInput from "./input/MyInput";
import MySelect from "./select/MySelect";

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="Search..."
      />
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="Sorting"
        options={[
          {
            value: "title",
            name: "Post name",
          },
          {
            value: "body",
            name: "Post description",
          },
        ]}
      />
    </div>
  );
};

export default PostFilter;
