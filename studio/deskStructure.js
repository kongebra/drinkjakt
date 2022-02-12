import S from "@sanity/desk-tool/structure-builder";
import { FaHome } from "react-icons/fa";

const Frontpage = S.listItem()
  .title("Front Page")
  .icon(FaHome)
  .child(S.editor().schemaType("frontpage").documentId("frontpage"));

const ExcludeList = ["frontpage"];

export default () =>
  S.list()
    .title("Content")
    .items([
      // Singeltons
      Frontpage,

      // Divider
      S.divider(),

      // Rest of the documents
      ...S.documentTypeListItems().filter(
        (listItem) => !ExcludeList.includes(listItem.getId())
      ),
    ]);
