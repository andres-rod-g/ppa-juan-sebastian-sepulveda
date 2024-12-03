import { CalendarDate, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import type { Schema } from "formity";

const productDataSchema: Schema = [
  {
    form: {
      defaultValues: {
        name: ["$name", []],
        description: ["$description", []],
        price: ["$price", []],
        imageUrl: ["$imageUrl", []],
        tags: ["$tags", []],
      },
      resolver: {
        name: [
          [{ "#$ne": ["#$name", ""] }, "El valor es Requerido"],
          [{ "#$lt": [{ "#$strLen": "#$name" }, 200] }, "Máximo 200 caracteres"],
        ],
        description: [
          [{ "#$ne": ["#$description", ""] }, "El valor es Requerido"],
          [{ "#$lt": [{ "#$strLen": "#$description" }, 1000] }, "Máximo 1000 caracteres"],
        ],
        price: [
          [{ "#$ne": ["#$price", ""] }, "El valor es Requerido"],
        ],
        imageUrl: [
          [{ "#$ne": ["#$imageUrl", ""] }, "El valor es Requerido"],
          [{ "#$lt": [{ "#$strLen": "#$imageUrl" }, 200] }, "Máximo 200 caracteres"],
        ],
        tags: [
          [{ "#$ne": ["#$tags", ""] }, "El valor es Requerido"],
          [{ "#$lt": [{ "#$strLen": "#$tags" }, 200] }, "Máximo 200 caracteres"],
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
              progress: { current: 1, total: 4 },
              barName: "Progreso de Registro",
              fields: [
                {
                  textField: {
                    name: "name",
                    label: "Nombre",
                  },
                },
                {
                  textAreaField: {
                    name: "description",
                    label: "Descripción",
                  },
                },
                {
                  textField: {
                    name: "price",
                    label: "Precio",
                  },
                },
                {
                  textField: {
                    name: "imageUrl",
                    label: "Url de la Imagen",
                    description: "Busca la imágen en google, dale click derecho y haz click en 'Copiar URL de la image'"
                  },
                },
                {
                  textField: {
                    name: "tags",
                    label: "Etiquetas",
                    description: "Escribe las etiquetas, separándolas por ','. Ejmplo: \"Productividad,Videojuegos\""
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
      description: "$description",
      price: "$price",
      imageUrl: "$imageUrl",
      tags: "$tags",
    },
  },
];


export default productDataSchema;
