import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Front Page")
        .child(S.editor().schemaType("frontpage").documentId("frontpage")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["frontpage"].includes(listItem.getId())
      ),
    ]);
