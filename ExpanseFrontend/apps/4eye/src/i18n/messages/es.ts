import type { Translations } from "../types"

const es: Translations = {
  common: {
    navigation: {
      home: "Inicio",
      contact: "Contacto",
      terms: "Términos de Servicio",
      privacyPolicy: "Política de Privacidad",
    },
    actions: {
      submit: "Enviar",
      cancel: "Cancelar",
      learnMore: "Más Información",
      getStarted: "Comenzar",
      contactUs: "Contáctenos",
    },
    footer: {
      copyright: "© {year} Expanse EDU",
      allRightsReserved: "Todos los derechos reservados.",
    },
  },
  home: {
    intro: {
      title: "Desbloqueando el potencial estudiantil",
      body: "Expanse empodera a nuestros estudiantes, maestros y familias brindándoles herramientas y tecnología modernas para llevar la educación al siguiente nivel.",
    },
    purpose: {
      title: "Nuestro Propósito",
      items: [
        {
          label: "Encender la pasión por aprender",
          description:
            "Haciendo la educación divertida y atractiva para que los estudiantes estén emocionados de ir a la escuela todos los días.",
        },
        {
          label: "Amplificar el Compromiso",
          description:
            "Hacer el ambiente del aula más atractivo a través de la gamificación.",
        },
        {
          label: "Impulsar el Rendimiento Académico",
          description:
            "Desbloquear el potencial de los estudiantes y motivarlos a ser todo lo que pueden ser mientras mejoran la comprensión del aprendizaje y la retención de información.",
        },
        {
          label: "Mejorar la Asistencia",
          description:
            "Crear un ambiente de aprendizaje que los estudiantes amen mientras se fomenta la asistencia regular.",
        },
        {
          label: "Maximizar el Aprendizaje",
          description:
            "Expanse impulsa la motivación y el compromiso, llevando a un aprendizaje más profundo y retención.",
        },
        {
          label: "Mejorar el Bienestar Estudiantil",
          description:
            "Cultivar ambientes positivos y de apoyo para todos.",
        },
      ],
    },
    problemSolutionStory: [
      {
        title: "Compromiso, Potenciado.",
        paragraphs: [
          "**En un mundo de gratificación instantánea, las recompensas de la educación pueden parecer distantes y abstractas.** Estamos compitiendo con el atractivo del placer inmediato, la descarga de dopamina de los likes y el entretenimiento moderno.",
          "**Expanse te da las herramientas para contraatacar.**",
        ],
      },
      {
        title: "Realización, Lograda.",
        paragraphs: [
          "**Los escritorios vacíos cuentan una historia de necesidades no satisfechas.** Cuando los estudiantes luchan por concentrarse, carecen de un sentido de propósito o enfrentan desafíos con su bienestar mental, emocional o físico, la escuela se convierte en un campo de batalla, no en un lugar de aprendizaje.",
          "**Expanse empodera a los estudiantes para enfocar su atención, descubrir su propósito y redescubrir la alegría de aprender.**",
        ],
      },
      {
        title: "Progreso y Potencial, Visualizados.",
        paragraphs: [
          "**Una mente nublada por la duda no puede volar.** Las creencias negativas sobre uno mismo recortan las alas del potencial. Debemos nutrir la autoconfianza y empoderar a nuestros estudiantes para ver las increíbles posibilidades que hay dentro de ellos.",
          "**Expanse ayuda a los estudiantes a reconocer su crecimiento y potencial, y creer en su capacidad de tener éxito.**",
        ],
      },
    ],
    advantages: {
      title: "Lo Que Nos Diferencia",
      items: [
        {
          label: "Compromiso Universal",
          description:
            "Nuestras estrategias de gamificación están diseñadas para involucrar a todos los estudiantes independientemente de su origen o nivel de habilidad.",
        },
        {
          label: "Empoderamiento del Maestro",
          description:
            "Proporcionamos a los maestros herramientas para integrar fácilmente la gamificación en su currículo existente.",
        },
        {
          label: "Información Basada en Datos",
          description:
            "Los análisis en tiempo real ayudan a los educadores a comprender el compromiso de los estudiantes y ajustar las estrategias en consecuencia.",
        },
        {
          label: "Integración Perfecta",
          description:
            "Nuestra plataforma se integra con los sistemas de gestión escolar existentes para una fácil adopción.",
        },
      ],
    },
    audience: {
      title: "A Quién Servimos",
      body: "Nos asociamos con escuelas K-12, distritos e instituciones educativas comprometidas con mejorar el compromiso y los resultados de los estudiantes a través de soluciones tecnológicas innovadoras.",
    },
    additionalGoals: {
      title: "Nuestras Metas",
      details: [
        {
          label: "Aumentar el Compromiso Estudiantil",
          body: "Impulsar la participación en el aula y el entusiasmo por aprender a través de incentivos basados en juegos.",
        },
        {
          label: "Mejorar los Resultados Académicos",
          body: "Impulsar mejoras medibles en calificaciones, puntajes de exámenes y retención del aprendizaje.",
        },
        {
          label: "Apoyar el Éxito del Educador",
          body: "Proporcionar a los maestros herramientas poderosas que mejoren, no compliquen, su experiencia de enseñanza.",
        },
      ],
    },
    gamificationEngagement: {
      title: "Gamificación Que Funciona",
      body: "Transforma tu aula en una aventura atractiva donde cada logro importa.",
      animation: {
        left: "Aprende",
        right: "Crece",
        center: ["Juega", "Gana", "Sube de Nivel"],
      },
    },
    curtains: {
      title: "¿Listo para Transformar la Educación?",
      body: "Únete a las escuelas que ya están viendo resultados con Expanse EDU.",
    },
    contact: {
      title: "Ponte en Contacto",
      buttonText: "Contáctenos",
    },
    thankYou: {
      text: "¡Gracias por tu interés en Expanse EDU!",
    },
  },
  contact: {
    pageTitle: "Ponte en Contacto",
    form: {
      name: "Tu Nombre",
      email: "Correo Electrónico",
      message: "Tu Mensaje",
      submit: "Enviar Mensaje",
    },
    success: {
      title: "¡Mensaje Enviado!",
      message: "Nos pondremos en contacto contigo lo antes posible.",
    },
    error: {
      title: "Algo salió mal",
      message: "Por favor intenta de nuevo o envíanos un correo directamente.",
    },
  },
}

export default es
