import { CalendarDate, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import type { Schema } from "formity";

const userRegisterSchema: Schema = [
  {
    form: {
      defaultValues: {
        name: ["", []],
        email: ["", []],
        password: ["", []],
      },
      resolver: {
        name: [
          [{ "#$ne": ["#$name", ""] }, "El valor es Requerido"],
          [{ "#$lt": [{ "#$strLen": "#$name" }, 200] }, "Máximo 200 caracteres"],
        ],
        email: [
          [{ "#$ne": ["#$email", ""] }, "El valor es Requerido"],
          [{ "#$lt": [{ "#$strLen": "#$email" }, 1000] }, "Máximo 1000 caracteres"],
          [{ "#$regexMatch": ["#$email", "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"] }, "No es un correo electrónico"],
        ],
        password: [
          [{ "#$ne": ["#$password", ""] }, "El valor es Requerido"],
          [{ "#$lt": [{ "#$strLen": "#$password" }, 20] }, "Máximo 20 caracteres"],
        ],
      },
      render: {
        form: {
          step: "$step",
          defaultValues: "$defaultValues",
          resolver: "$resolver",
          onNext: "$onNext",
          children: {
            formLayout: {
              heading: "",
              description: "",
              fields: [
                {
                  textField: {
                    name: "name",
                    label: "Nombre",
                  },
                },
                {
                  textField: {
                    name: "email",
                    label: "Correo Electrónico",
                  },
                },
                {
                  secretField: {
                    name: "password",
                    label: "Contraseña",
                  },
                },
              ],
              button: {
                next: { text: "Continuar" },
              },
            },
          },
        },

      },
    },
  },
  {
    return: {
      name: "$name",
      email: "$email",
      password: "$password",
    },
  },
];


export default userRegisterSchema;
