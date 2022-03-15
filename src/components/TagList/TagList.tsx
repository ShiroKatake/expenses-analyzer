import { createContext, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../context/AppContext";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { StyledTagArrayContainer } from "./TagList.styled";
import { ITagProps, Tag } from "..";
import { usePrevious } from "../../hooks/usePrevious";

interface ITagListContext {
  addEmptyTag: () => void;
  updateTag: (tagName: string, id: string) => void;
  removeTag: (tagId: string) => void;
}

const TagListContext = createContext({} as ITagListContext);
export const useTagListContext = () => useContext(TagListContext);

export const TagManager = () => {
  const MAX_TAG_COUNT = 10;
  const { isHidden, setIsHidden } = useAppContext();
  const tagListRef = useRef<HTMLDivElement>(null);
  const newestTagRef = useRef<HTMLButtonElement>(null);
  const [tagArray, setTagList] = useState<ITagProps[]>([
    {
      tagId: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      tagName: "Add tag",
    },
  ]);

  useOutsideClick(tagListRef, () => setIsHidden(true));

  const previousTagArray = usePrevious(tagArray);
  useEffect(() => {
    if (tagArray.length > previousTagArray?.length) {
      newestTagRef.current?.click();
    }
  }, [tagArray]);


  const addEmptyTag = () => {
    setTagList((existingArray) => [...existingArray, { tagId: uuidv4(), tagName: "Add tag" }]);
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
    addEmptyTag,
    updateTag,
    removeTag,
  };

  const tags = tagArray.map((tag, index) => {
    if (index < MAX_TAG_COUNT) {
      return (
        <Tag
          tagRef={index === tagArray.length - 1 ? newestTagRef : undefined}
          key={tag.tagId}
          tagId={tag.tagId}
          tagName={tag.tagName}
        />
      );
    }
  });

  return (
    <>
      {!isHidden &&
        <TagListContext.Provider value={tagListContext}>
          <StyledTagArrayContainer ref={tagListRef}>{tags}</StyledTagArrayContainer>
        </TagListContext.Provider>
      }
    </>
  );
};
