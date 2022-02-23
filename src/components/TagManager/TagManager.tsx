import { createContext, useContext, useState } from "react";
import { ITagProps, Tag } from "../Tag/Tag";
import { StyledTagArrayContainer } from "./TagManager.styled";

interface ITagListContext {
  addTag: (tagName: string, id: string) => void;
  updateTag: (tagName: string, id: string) => void;
  removeTag: (tagId: string) => void;
}

const TagListContext = createContext({} as ITagListContext);
export const useTagListContext = () => useContext(TagListContext);

export const TagManager = () => {
  const MAX_TAG_SIZE = 10;
  const [tagArray, setTagList] = useState<ITagProps[]>([
    {
      tagId: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      tagName: "",
    },
  ]);

  const addTag = (tagName: string, id: string) => {
    setTagList((existingArray) => [...existingArray, { tagId: id, tagName }]);
  };

  const updateTag = (tagName: string, id: string) => {
    let updatedTagArray = tagArray.map((tag) => {
      if (tag.tagId == id) {
        return { ...tag, tagName: tagName };
      }
      return tag;
    });
    setTagList(updatedTagArray);
  };

  const removeTag = (tagId: string) => {
    setTagList(tagArray.filter((existingTag: ITagProps) => existingTag.tagId !== tagId));
  };

  const tagListContext: ITagListContext = {
    addTag,
    updateTag,
    removeTag,
  };

  const subsequentTags = tagArray.map((tag, index) => {
    if (index < MAX_TAG_SIZE) {
      return <Tag key={tag.tagId} tagId={tag.tagId} tagName={tag.tagName} />;
    }
  });

  return (
    <TagListContext.Provider value={tagListContext}>
      <StyledTagArrayContainer>{subsequentTags}</StyledTagArrayContainer>
    </TagListContext.Provider>
  );
};
