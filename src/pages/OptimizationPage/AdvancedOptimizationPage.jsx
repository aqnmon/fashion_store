import CatalogCompare from "./CatalogCompare";
import { bigProductsData } from "./bigData";
import "./AdvancedOptimizationPage.css";

function AdvancedOptimizationPage() {
  return (
    <CatalogCompare products={bigProductsData}>
     
    </CatalogCompare>
  );
}

export default AdvancedOptimizationPage;
