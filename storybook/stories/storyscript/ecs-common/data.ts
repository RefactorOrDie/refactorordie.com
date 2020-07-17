import { ECSData, systemData } from "./state";

function world() {
  const data: ECSData = {
    allComponents: [],
    allSystems: [],
    allUniques: []
  };

  const world = {
    idFromLabel(label: string, kind: "component" | "unique"): number {
      const { id } = data.allComponents.find(c => c.label === label) ||
        data.allSystems.find(c => c.label === label) ||
        data.allUniques.find(c => c.label === label) || { id: 0 };
      if (id === 0) {
        const tryAgain = label.split("::")[1];
        if (tryAgain) {
          return idFromLabel(tryAgain, kind);
        } else {
          if (kind === "component") {
            return world.component(label);
          } else {
            return world.unique(label);
          }
        }
      }
      console.assert(id, `better find that id for "${label}"!`);
      return id;
    },
    addTagsToLabels(labels: string[], tags: string[]) {
      const hasLabel = ({ label }) => labels.includes(label);
      const toUpdate: { tags: string[] }[] = [
        ...data.allComponents.filter(hasLabel),
        ...data.allSystems.filter(hasLabel),
        ...data.allUniques.filter(hasLabel)
      ];
      for (const item of toUpdate) {
        item.tags.push(...tags);
      }
    },
    component(label: string, tags: string[] = []) {
      const id = hash(label);
      data.allComponents.push({
        id,
        label,
        tags
      });
      return id;
    },
    unique(label: string, tags: string[] = []) {
      const id = hash(label);
      data.allUniques.push({
        id,
        label,
        tags
      });
      return id;
    },
    system(label: string, tags: string[] = []) {
      const id = hash(label);
      const sys = systemData(id, label, { tags });
      data.allSystems.push(sys);
      const self = {
        view(...ids: number[]) {
          sys.viewComponentIds.push(...ids);
          return self;
        },
        viewMut(...ids: number[]) {
          sys.viewMutComponentIds.push(...ids);
          return self;
        },
        uniqueView(...ids: number[]) {
          sys.viewUniqueIds.push(...ids);
          return self;
        },
        uniqueViewMut(...ids: number[]) {
          sys.viewMutUniqueIds.push(...ids);
          return self;
        }
      };
      return self;
    },
    build() {
      return data;
    }
  };

  return world;
}

const {
  build,
  component,
  system,
  unique,
  idFromLabel,
  addTagsToLabels
} = world();

/** Archetypes */
export const ats = {
  Page: "Page",
  Skill: "Skill",
  Tokens: "Tokens",
  Block: "Block",
  Atom: "Atom"
};

/** Roles */
export const roles = {
  Save: "Save",
  SyncToUI: "Sync to UI",
  SyncToExecutor: "Sync to Executor",
  Semantics: "Semantics",
  Indexing: "Indexing",
  Hierarchy: "Hierarchy"
};

const Entities = unique("Entities");

const UID = component("UID", [ats.Atom, ats.Block, ats.Tokens, ats.Skill]);
const PageTag = component("PageTag", [ats.Page]);
const SkillTag = component("SkillTag", [ats.Skill]);
const ChildOf = component("ChildOf", [ats.Skill, ats.Block]);
const ParentIndex = component("ParentIndex", [ats.Skill, ats.Block]);
const SiblingIndex = component("SiblingIndex", [ats.Skill, ats.Block]);
const ecs_BlockKindTag = component("ecs::BlockKindTag", [ats.Block]);
const BlockStyle = component("BlockStyle", [ats.Block]);

// Atom archetype
const AtomDisplay = component("AtomDisplay", [ats.Atom]);
const AtomKind = component("AtomKind", [ats.Atom]);
// Atom index
const semantics_AtomScopeCheck = component("AtomScopeCheck", [ats.Atom]);

const ecs_Tokens = component("ecs::Tokens", [ats.Block]);

const ui_OptUITokensSelection = unique("Option<ui::UITokensSelection>");
const suggestions_CursorIndex = unique("suggestions::CursorIndex");

const UIDLookup = unique("UIDLookup");

system("import_page(PaveSaveObject) -> EntityId", [roles.Save])
  .uniqueViewMut(Entities)
  .viewMut(PageTag, SkillTag)
  .viewMut(ChildOf)
  .viewMut(UID)
  .viewMut(ecs_BlockKindTag, BlockStyle, AtomDisplay, AtomKind, ecs_Tokens);

system("export(EntityId) -> PageSaveObject", [roles.Save])
  .view(PageTag, SkillTag)
  .view(ParentIndex)
  .view(UID)
  .view(AtomDisplay, AtomKind)
  .view(ecs_BlockKindTag, BlockStyle, ecs_Tokens);

system("atom_view_collect_updates() -> Vec<(UID, ui::AtomView)>", [
  roles.SyncToUI
])
  .view(UID)
  .view(AtomKind)
  .viewMut(semantics_AtomScopeCheck)
  .viewMut(AtomDisplay);

system(
  "suggestions::cursor_collect_suggestions() -> Option<SelectionSuggestions>",
  [roles.SyncToUI]
)
  .uniqueView(ui_OptUITokensSelection)
  .uniqueView(suggestions_CursorIndex)
  .uniqueViewMut(Entities)
  .viewMut(UID)
  .viewMut(AtomKind)
  .viewMut(AtomDisplay)
  .viewMut(BlockStyle)
  .viewMut(ecs_Tokens)
  .viewMut(ecs_BlockKindTag)
  .viewMut(ChildOf);

system("update_tokens(UID, Vec<ui::Token>)", [roles.SyncToExecutor])
  .uniqueView(UIDLookup)
  .uniqueViewMut(Entities)
  .viewMut(ecs_Tokens)
  .viewMut(UID)
  .viewMut(AtomDisplay, AtomKind);

system("update_block_style(UID, ui::BlockStyle)", [roles.SyncToExecutor])
  .uniqueView(UIDLookup)
  .viewMut(BlockStyle);

system("remove_block(UID)", [roles.SyncToExecutor])
  .uniqueView(UIDLookup)
  .viewMut(ChildOf);

system("move_blocks(ui::BlockRelativePosition, Vec<UID>)", [
  roles.SyncToExecutor
])
  .uniqueView(UIDLookup)
  .view(ParentIndex)
  .view(SiblingIndex)
  .uniqueView(Entities)
  .viewMut(ChildOf);

system("create_basic_blocks(ui::BlockRelativePosition, Vec<ui::BlockKind>)", [
  roles.SyncToExecutor
])
  .uniqueView(UIDLookup)
  .view(ParentIndex)
  .view(SiblingIndex)
  .uniqueViewMut(Entities)
  .viewMut(ChildOf)
  .viewMut(UID)
  .viewMut(ecs_Tokens)
  .viewMut(BlockStyle)
  .viewMut(ecs_BlockKindTag);

// Convert to number
function hash(str: string) {
  let hash = 0;
  let char: number;
  for (let i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return (Math.abs(hash) % 10000) * 0.0001;
}
const cmd = `
for name in $(rg with_system -g '!crates' | awk -F'(' '{print $NF}' | sed 's/)//g' | awk -F '::' '{print $NF}'); do
    rg "fn $name.*?\) " --multiline --multiline-dotall -N
done
`;
const hmm = `
storycore/src/id/uid_indexing.rs
pub fn uid_indexing(mut uid_map: UniqueViewMut<UIDLookup>, mut vm_uid: ViewMut<UID>) {
storycore/src/semantics/scope_indexing.rs
pub fn scope_indexing(
    v_entities: EntitiesView,
    v_parent_index: View<ParentIndex>,
    v_skill_tag: View<ecs::SkillTag>,
    v_block_kind_tag: View<ecs::BlockKindTag>,
    mut vm_scope_kind: ViewMut<ScopeKind>,
) {
storycore/src/semantics/atom_dependency_indexing.rs
pub fn atom_dependency_indexing(
    v_entities: EntitiesView,
    v_atom_kind: View<dust::AtomKind>,
    uid_index: UniqueView<id::UIDLookup>,
    mut vm_atom_depends_on: ViewMut<AtomDependsOn>,
) {
storycore/src/semantics/scope_dependency_checking.rs
pub fn scope_dependency_checking(
    v_entities: EntitiesView,
    v_skill_tag: View<ecs::SkillTag>,
    v_parent_index: View<ParentIndex>,
    v_atom_depends_on: View<AtomDependsOn>,
    v_scope_kind: View<ScopeKind>,
    v_tokens: View<ecs::Tokens>,
    v_uid: View<UID>,
    mut vm_atom_scope_check: ViewMut<AtomScopeCheck>,
) {
web_author/src/executor/suggestions/cursor_indexing.rs
pub fn cursor_indexing(
    current_selection: UniqueView<Option<ui::UITokensSelection>>,
    mut uvm_cursor_index: UniqueViewMut<CursorIndex>,
    v_tokens: View<ecs::Tokens>,
    v_atom_kind: View<dust::AtomKind>,
    v_atom_display: View<dust::AtomDisplay>,
    v_skill_tag: View<ecs::SkillTag>,
    v_sibling_index: View<SiblingIndex>,
    uid_index: UniqueView<UIDLookup>,
) {
web_author/src/executor/suggestions.rs
pub fn suggesting(uv_cursor_index: UniqueView<CursorIndex>) {
storycore/src/tree/indexing.rs
pub fn tree_indexing(
    (v_entities, mut vm_child_of, mut vm_sibling_index, mut vm_parent_index): (
        EntitiesView,
        ViewMut<ChildOf>,
        ViewMut<SiblingIndex>,
        ViewMut<ParentIndex>,
    ),
) {
storycore/src/tree/reordering.rs
pub fn tree_reordering(
    (mut commands, mut vm_child_of, v_parent_index): (
        UniqueViewMut<ReorderCommands>,
        ViewMut<ChildOf>,
        View<ParentIndex>,
    ),
) {
`;

for (const systemDefRust of hmm.split(/(storycore|web_author)/g)) {
  let match = systemDefRust.match(/pub fn (\w+)/);
  if (match == null) continue;
  const [_, systemName] = match;
  const sys = system(systemName);
  if (/EntitiesView\b/.test(systemDefRust)) {
    sys.uniqueView(Entities);
  }
  if (/EntitiesViewMut\b/.test(systemDefRust)) {
    sys.uniqueViewMut(Entities);
  }
  const viewedRE = /\bView<([\w:]+)>/g;
  while ((match = viewedRE.exec(systemDefRust))) {
    const id = idFromLabel(match[1], "component");
    sys.view(id);
  }
  const viewMutedRE = /\bViewMut<([\w:]+)>/g;
  while ((match = viewMutedRE.exec(systemDefRust))) {
    const id = idFromLabel(match[1], "component");
    sys.viewMut(id);
  }
  const uniqueViewedRE = /\bUniqueView<([\w:]+)>/g;
  while ((match = uniqueViewedRE.exec(systemDefRust))) {
    const id = idFromLabel(match[1], "unique");
    sys.uniqueView(id);
  }
  const uniqueViewMutedRE = /\bUniqueViewMut<([\w:]+)>/g;
  while ((match = uniqueViewMutedRE.exec(systemDefRust))) {
    const id = idFromLabel(match[1], "unique");
    sys.uniqueViewMut(id);
  }
}

addTagsToLabels(["tree_reordering", "tree_indexing"], [roles.Hierarchy]);
addTagsToLabels(
  ["suggesting", "scope_dependency_checking", "atom_dependency_indexing"],
  [roles.Semantics]
);
addTagsToLabels(["suggesting"], [roles.SyncToUI]);
addTagsToLabels(
  [
    "tree_indexing",
    "uid_indexing",
    "scope_indexing",
    "atom_dependency_indexing",
    "cursor_indexing",
    "cursor_indexing"
  ],
  [roles.Indexing]
);

export const data = build();
