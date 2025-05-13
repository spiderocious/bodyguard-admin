import axios from "axios";
import { Calendar, Clock, Filter, UserCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { getToken } from "../services/api.service";

// Define the interface for verification data based on your API response
interface VerificationUser {
  _id: string;
  userId: string;
  scheduledDate: string;
  status: string;
  metaData: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}

interface VerificationResponse {
  status: number;
  message: string;
  data: {
    date: string;
    users: VerificationUser[];
    count: number;
    maxCapacity: number;
  };
}

export const v2baseUrl = "https://bdapp-backend-dev.up.railway.app";

// Function to format date as DD-MM-YYYY
const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    weekday: "long",
  });
};

// Function to format date for API query
const formatDateForAPI = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Function to get today's date formatted
const getTodayFormatted = (): string => {
  return formatDateForAPI(new Date());
};

// Function to fetch verifications
const getPhysicalVerifications = async (date?: string) => {
  const url = date
    ? `${v2baseUrl}/api/v2/user/physical-verifications?date=${date}`
    : `${v2baseUrl}/api/v2/user/physical-verifications`;

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

const PhysicalVerification = () => {
  const navigate = useNavigate();
  const [verifications, setVerifications] = useState<VerificationUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [capacity, setCapacity] = useState({ current: 0, max: 10 });
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Define columns for the data table
  const columns = [
    {
      key: "createdAt",
      label: "Bodyguard Name",
      render: (row: any) => {
        const firstName = row?.metaData?.firstName || "N/A";
        const lastName = row?.metaData?.lastName || "N/A";
        const name =
          firstName !== "N/A" || lastName !== "N/A"
            ? `${firstName} ${lastName}`.trim()
            : "N/A";

        return (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600 font-medium">
              {name !== "N/A" ? name.charAt(0) : "U"}
            </div>
            <span className="font-medium">{name}</span>
          </div>
        );
      },
    },
    {
      key: "email",
      label: "Email Address",
      render: (row: VerificationUser) => {
        return row?.metaData?.email || row?.userId || "N/A";
      },
    },
    {
      key: "status",
      label: "Status",
      render: (row: VerificationUser) => (
        <StatusBadge
          status={row?.status}
          variant={
            row.status === "completed"
              ? "success"
              : row.status === "pending"
              ? "warning"
              : row.status === "no_show"
              ? "error"
              : "info"
          }
        />
      ),
    },
  ];

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async (date?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: VerificationResponse = await getPhysicalVerifications(
        date
      );

      if (response.status === 200) {
        setVerifications(response.data.users);
        console.log(response.data.users);
        setScheduledDate(response.data.date);
        setCapacity({
          current: response.data.count,
          max: response.data.maxCapacity,
        });
      } else {
        setError("Failed to load verifications");
      }
    } catch (err) {
      console.error("Error fetching verifications:", err);
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelection = (date: Date) => {
    setCalendarDate(date);
    const formattedDate = formatDateForAPI(date);
    setSelectedDate(formattedDate);
    fetchVerifications(formattedDate);
    setShowDatePicker(false);
  };

  const resetDateFilter = () => {
    setSelectedDate("");
    fetchVerifications();
  };


  const navigateToVerificationDetails = (verification: VerificationUser) => {
    // Store verification details in localStorage for the details page
    //localStorage.setItem("physical-verification", JSON.stringify(verification));
      // Navigate to details page (you would create this route)
      //console.log(verification.metaData);
      localStorage.setItem("kyc", JSON.stringify(verification.metaData));
    navigate(`/verification/${verification._id}`);
  };

  // Render date picker calendar
  const renderCalendar = () => {
    const today = new Date();
    const daysInMonth = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth(),
      1
    ).getDay();

    // Create array of days
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth(),
        i
      );
      const isToday = date.toDateString() === today.toDateString();
      const isSelected =
        date.toDateString() === new Date(calendarDate).toDateString();

      days.push(
        <div
          key={`day-${i}`}
          onClick={() => handleDateSelection(date)}
          className={`h-8 w-8 rounded-full flex items-center justify-center cursor-pointer text-sm
            ${isToday ? "border border-blue-500" : ""}
            ${isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-100"}
          `}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Physical Verification"
        icon={UserCheck}
        actions={
          <div className="flex space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {selectedDate
                  ? formatDateForDisplay(calendarDate.toString())
                  : "Filter by date"}
                {selectedDate && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetDateFilter();
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </button>

              {showDatePicker && (
                <div className="absolute mt-2 bg-white border rounded-lg shadow-lg p-3 z-10 w-72">
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={() =>
                        setCalendarDate(
                          new Date(
                            calendarDate.getFullYear(),
                            calendarDate.getMonth() - 1,
                            1
                          )
                        )
                      }
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      &lt;
                    </button>
                    <div className="font-medium">
                      {calendarDate.toLocaleString("default", {
                        month: "long",
                      })}{" "}
                      {calendarDate.getFullYear()}
                    </div>
                    <button
                      onClick={() =>
                        setCalendarDate(
                          new Date(
                            calendarDate.getFullYear(),
                            calendarDate.getMonth() + 1,
                            1
                          )
                        )
                      }
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      &gt;
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day}>{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 mt-1">
                    {renderCalendar()}
                  </div>
                  <div className="mt-2 flex justify-between">
                    <button
                      onClick={() => {
                        const today = new Date();
                        setCalendarDate(today);
                        handleDateSelection(today);
                      }}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => setShowDatePicker(false)}
                      className="text-xs text-gray-600 hover:underline"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        }
      />

      {/* Date and Capacity Indicator */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          <h2 className="text-lg font-medium">
            {scheduledDate
              ? `Appointments for ${formatDateForDisplay(scheduledDate)}`
              : "Today's Appointments"}
          </h2>
        </div>
        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
          <Users className="w-4 h-4 mr-2 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            {capacity.current} of {capacity.max} slots filled
          </span>
          <div className="ml-3 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600"
              style={{ width: `${(capacity.current / capacity.max) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Error and Loading States */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : verifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-6">
            <Calendar className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">
              No appointments scheduled
            </h3>
            <p className="text-gray-500 max-w-md">
              {selectedDate
                ? `There are no physical verifications scheduled for ${formatDateForDisplay(
                    calendarDate.toString()
                  )}.`
                : "There are no physical verifications scheduled for today."}
            </p>
            {selectedDate && (
              <button
                onClick={resetDateFilter}
                className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
              >
                View Today's Appointments
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Status Filter Tabs */}
            <div className="bg-gray-50 px-6 py-3 border-b flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">
                Filter by status:
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  All
                </button>
                {/* <button className="px-3 py-1 text-gray-600 text-sm font-medium rounded-full hover:bg-gray-200">
                  Pending
                </button>
                <button className="px-3 py-1 text-gray-600 text-sm font-medium rounded-full hover:bg-gray-200">
                  Completed
                </button> */}
              </div>
            </div>

            <DataTable
              columns={columns}
              data={verifications}
              onRowClick={navigateToVerificationDetails}
            />
          </>
        )}
      </div>

      {/* Quick Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-700">Today's Summary</h3>
            <div className="bg-green-100 text-green-700 rounded-full p-2">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-semibold mt-1">
                {verifications.filter((v) => v.status === "pending").length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-semibold mt-1">
                {verifications.filter((v) => v.status === "completed").length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">No-shows</p>
              <p className="text-xl font-semibold mt-1">
                {verifications.filter((v) => v.status === "no_show").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-700">Next Appointment</h3>
            <div className="bg-blue-100 text-blue-700 rounded-full p-2">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          {verifications.filter((v) => v.status === "pending").length > 0 ? (
            <div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600 font-medium">
                  {verifications[0]?.metaData?.firstName?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="font-medium">
                    {verifications[0]?.metaData?.firstName || "N/A"}{" "}
                    {verifications[0]?.metaData?.lastName || ""}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(
                      verifications[0]?.scheduledDate
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigateToVerificationDetails(verifications[0])}
                className="mt-4 text-sm text-blue-600 hover:underline flex items-center"
              >
                View details
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <p className="text-gray-500">No pending appointments</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-700">Capacity</h3>
            <div className="bg-amber-100 text-amber-700 rounded-full p-2">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">Today's slots</p>
              <p className="font-semibold">
                {capacity.current}/{capacity.max}
              </p>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  capacity.current >= capacity.max
                    ? "bg-red-500"
                    : "bg-blue-600"
                }`}
                style={{
                  width: `${Math.min(
                    (capacity.current / capacity.max) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {capacity.max - capacity.current} slots available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalVerification;
