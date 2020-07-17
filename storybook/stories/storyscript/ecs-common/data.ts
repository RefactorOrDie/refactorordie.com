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
    component(label: string) {
      const id = hash(label);
      data.allComponents.push({
        id,
        label
      });
      return id;
    },
    unique(label: string) {
      const id = hash(label);
      data.allUniques.push({
        id,
        label
      });
      return id;
    },
    system(label: string) {
      const id = hash(label);
      const sys = systemData(id, label, {});
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

const { build, component, system, unique, idFromLabel } = world();

const Entities = unique("Entities");

const UID = component("UID");
const PageTag = component("PageTag");
const SkillTag = component("SkillTag");
const ChildOf = component("ChildOf");
const ParentIndex = component("ParentIndex");
const SiblingIndex = component("SiblingIndex");
const ecs_BlockKindTag = component("ecs::BlockKindTag");
const BlockStyle = component("BlockStyle");

// Atom archetype
const AtomDisplay = component("AtomDisplay");
const AtomKind = component("AtomKind");
// Atom index
const semantics_AtomScopeCheck = component("AtomScopeCheck");

const ecs_Tokens = component("ecs::Tokens");

const ui_OptUITokensSelection = unique("Option<ui::UITokensSelection>");
const suggestions_CursorIndex = unique("suggestions::CursorIndex");

const UIDLookup = unique("UIDLookup");

system("save_objects::import_page(PaveSaveObject) -> EntityId")
  .uniqueViewMut(Entities)
  .viewMut(PageTag, SkillTag)
  .viewMut(ChildOf)
  .viewMut(UID)
  .viewMut(ecs_BlockKindTag, BlockStyle, AtomDisplay, AtomKind, ecs_Tokens);

system("save_objects::export(EntityId) -> PageSaveObject")
  .view(PageTag, SkillTag)
  .view(ParentIndex)
  .view(UID)
  .view(AtomDisplay, AtomKind)
  .view(ecs_BlockKindTag, BlockStyle, ecs_Tokens);

system("sync::atom_view_collect_updates() -> Vec<(UID, ui::AtomView)>")
  .view(UID)
  .view(AtomKind)
  .viewMut(semantics_AtomScopeCheck)
  .viewMut(AtomDisplay);

system(
  "suggestions::cursor_collect_suggestions() -> Option<SelectionSuggestions>"
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

system("sync::update_tokens(UID, Vec<ui::Token>)")
  .uniqueView(UIDLookup)
  .uniqueViewMut(Entities)
  .viewMut(ecs_Tokens)
  .viewMut(UID)
  .viewMut(AtomDisplay, AtomKind);

system("sync::update_block_style(UID, ui::BlockStyle)")
  .uniqueView(UIDLookup)
  .viewMut(BlockStyle);

system("sync::remove_block(UID)")
  .uniqueView(UIDLookup)
  .viewMut(ChildOf);

system("sync::move_blocks(ui::BlockRelativePosition, Vec<UID>)")
  .uniqueView(UIDLookup)
  .view(ParentIndex)
  .view(SiblingIndex)
  .uniqueView(Entities)
  .viewMut(ChildOf);

system(
  "sync::create_basic_blocks(ui::BlockRelativePosition, Vec<ui::BlockKind>)"
)
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
storycore/src/tree/indexing.rs
pub fn tree_indexing(
    (v_entities, mut vm_child_of, mut vm_sibling_index, mut vm_parent_index): (
        EntitiesView,
        ViewMut<ChildOf>,
        ViewMut<SiblingIndex>,
        ViewMut<ParentIndex>,
    ),
) {
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
storycore/src/tree/indexing.rs
pub fn tree_indexing(
    (v_entities, mut vm_child_of, mut vm_sibling_index, mut vm_parent_index): (
        EntitiesView,
        ViewMut<ChildOf>,
        ViewMut<SiblingIndex>,
        ViewMut<ParentIndex>,
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

export const data = build();
