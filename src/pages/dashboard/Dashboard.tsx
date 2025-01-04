import { ToolsBar } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <BaseLayout
      title="Dashboard"
      toolsBar={<ToolsBar showSearchInput showNewButton />}
    >
      Tesa
    </BaseLayout>
  );
};
