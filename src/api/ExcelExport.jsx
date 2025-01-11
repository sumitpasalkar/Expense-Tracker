import axios from "axios";


export const expExcel = async (getId) => {
  try {

    const response = await axios.post(
      "http://localhost/expense_api/Excel_report.php",{ getId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );
  
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `expense_report_${Date.now()}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    console.log("Excel file downloaded successfully.");
  } catch (error) {
    console.error("Error downloading the Excel file:", error);
    throw error;
  }
}
