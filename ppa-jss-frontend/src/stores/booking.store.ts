import { create } from "zustand";
import type { DateValue } from "@nextui-org/calendar";
import {
  parseDate,
  today,
  CalendarDate,
  getLocalTimeZone,
  getDayOfWeek,
} from "@internationalized/date";
import { ca } from "date-fns/locale";
import { ECity, EUserGender, type EUserRole, type IUser } from "@/interfaces/models/users.interface";

export type TBookingFlowSteps = "CALENDAR" | "TABLE" | "CONFIRMATION" | "AUTH" | "PAYMENT" | "CREDIT_CARD" | "QR"

type IUserBookingData = Omit<IUser, 'role'>

export interface BookingDataType {
  data: {
    date: DateValue;
    hour?: number;
    amount_of_guests: number;
    selected_zone?: string;
    step: TBookingFlowSteps;
    auth: IUserBookingData
  };

  setDate: (value: DateValue) => void;
  setHour: (value: number) => void;
  setGuests: (value: number) => void;
  setSelectedZone: (value: string) => void;
  setAuthData: (key: keyof IUserBookingData, value: any) => void;

  handleBack: () => void;
  handleContinue: (nextStep?: TBookingFlowSteps) => void;

  sendRequest: () => void;
}

export const useBookingData = create<BookingDataType>((set, get) => ({
  data: {
    date: today(getLocalTimeZone()),
    step: "CALENDAR",
    amount_of_guests: 1,
    auth: {
      email: "",
      gender: EUserGender.MALE,
      name: "",
      password: "",
      phone: "",
      city: ECity.CUCUTA,
      birthday: new Date()
    }
  },

  setDate: (value) => {
    set((state) => ({
      data: {
        ...state.data,
        date: parseDate(value.toString()),
      },
    }));

    console.log("Date Updated:", value);
  },

  setHour: (value) => {
    set((state) => ({
      data: {
        ...state.data,
        hour: value,
      },
    }));
  },

  setGuests: (value) => {
    set((state) => ({
      data: {
        ...state.data,
        amount_of_guests: value,
      },
    }));
  },

  setSelectedZone: (value) => {
    set((state) => ({
      data: {
        ...state.data,
        selected_zone: value,
      },
    }));
  },

  handleBack: () => {
    switch (get().data.step) {
      case "CALENDAR":
        break;

      case "TABLE":
        set((state) => ({
          data: {
            ...state.data,
            step: "CALENDAR",
          },
        }));
        break;

      case "CONFIRMATION":
        set((state) => ({
          data: {
            ...state.data,
            step: "TABLE",
          },
        }));
        break;

      case "AUTH":
        set((state) => ({
          data: {
            ...state.data,
            step: "CONFIRMATION",
          },
        }));
        break;

      case "PAYMENT":
        set((state) => ({
          data: {
            ...state.data,
            step: "AUTH",
          },
        }));
        break;

      case "QR":
        set((state) => ({
          data: {
            ...state.data,
            step: "PAYMENT",
          },
        }));
        break;
    }
  },

  setAuthData: (key: keyof IUserBookingData, value: any) => {
    set((state) => ({
      ...state,
      data: {
        ...state.data,
        auth: {
          ...state.data.auth,
          [key]: value
        }
      }
    }))
  },

  handleContinue: (nextStep) => {
    console.log("Requested to continue to next step:", nextStep);

    if (nextStep){
      set((state) => ({
        data: {
          ...state.data,
          step: nextStep,
        },
      }));
      return
    }

    switch (get().data.step) {
      case "CALENDAR":
        set((state) => ({
          data: {
            ...state.data,
            step: "TABLE",
          },
        }));
        break;

      case "TABLE":
        set((state) => ({
          data: {
            ...state.data,
            step: "CONFIRMATION",
          },
        }));
        break;

      case "CONFIRMATION":
        set((state) => ({
          data: {
            ...state.data,
            step: "AUTH",
          },
        }));
        break;
      case "AUTH":
        set((state) => ({
          data: {
            ...state.data,
            step: "PAYMENT",
          },
        }));
        break;
      case "PAYMENT":
        set((state) => ({
          data: {
            ...state.data,
            step: "QR",
          },
        }));
        break;
    }
  },

  sendRequest: () => {},
}));
