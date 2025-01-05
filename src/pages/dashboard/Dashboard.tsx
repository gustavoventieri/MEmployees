import { ToolsBar } from "../../shared/components";
import { DetailsTools } from "../../shared/components/detailstools/DetailsTool";
import { BaseLayout } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <BaseLayout
      title="Dashboard"
      toolsBar={
        <DetailsTools showSaveAndExitButtonLoading showPreviousButton={false} />
      }
    >
      .
    </BaseLayout>
  );
};
