import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase'
import * as moment from 'moment';
import { generateRandomId } from "../tools/randomStr";

//import app from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    empresa: {},
    empleados: [],
    empresas: [],
    evento: {
      ceremoniaAdicional: 'No',
      codigoVestimenta: 'Formal',
      tipoEvento: 'Boda Religiosa',
      nombreEvento: '',
      nombreCliente: '',
      numeroInvitaciones: 0,
      telefonoCliente: '',
      fechaEvento: '',
      docs: [],
      soloAdultos: false,
      fondo: 'fondoboda.jpeg',
      fuenteTitulo: "'Parisienne', cursive",
      fuenteCuerpo: "'Gilda Display', serif",
      tamanoFuenteTitulo: 30,
      tamanoFuenteCuerpo: 15,
      tema: {
        preview: 'spark-shine.png',
        nombre: 'Spark&Shine',
        fondo: 'background-gems.png',
      },
      textoLocacionEvento: "",
      textoLocacionCeremonia: "",
      textoLocacionCeremoniaAdicional: "",
      colorFuenteTitulo: "#333",
      colorFuenteCuerpo: "#333",
      locacionEvento: {
        lat: 20.967298,
        lng:-89.623639
      }, 
      locacionCeremonia: {
        lat: 20.967298,
        lng:-89.623639
      },
      locacionCeremoniaAdicional: {
        lat: 20.967298,
        lng:-89.623639
      }
    },
    eventos: [],
    invitados: [],
    opciones: [
        {
          "estilos": {
            "fuentes": [],
            "coloresFuentes": [],
            "fondos": [],
            "idFirebase": ""
          },
          temas: [
            { fondo: "background-gems.png" }
          ]
        }
    ],
    respuestaAnadirEvento: "",
    respuestaAnadirEmpresa: "",
    respuestaEditarEvento: "",
    visibles: {
      bienvenida: true,
      confirmacionAsistencia: true,
      asistencia: ""
    },
    datosApp: {
      invitado: {
        isUpdated: false,
      },
      evento: {},
      respuesta: {
        codigoInvitado: "",
      }
    }
  },
  getters: {
  },
  mutations: {
    setBienvenida(state, valor){
      state.visibles.bienvenida = valor;
    },
    setConfirmacionAsistencia(state, valor) {
      state.visibles.confirmacionAsistencia = valor.visibilidad;
      state.visibles.asistencia = valor.statusConfirmacion;
      state.datosApp.invitado.statusConfirmacion = valor.statusConfirmacion;
    },
    setEmpleados(state, valor) {
      state.empleados = valor;
    },
    setEmpresa(state, valor) {
      state.empresa = valor;
    },
    setEmpresas(state, valor) {
      state.empresas.push(valor);
    },
    setEvento(state, valor) {
      state.evento = valor;
    },
    setEventoApp(state, valor) {
      state.datosApp.evento = valor;
    },
    setEventos(state, valor) {
      state.eventos.push(valor);
    },
    setLocation(state, valor) {
      state.evento.locacionEvento = valor;
    },
    setLocationCeremony(state, valor) {
      state.evento.locacionCeremonia = valor;
    },
    setLocationCeremonyAdd(state, valor) {
      state.evento.locacionCeremoniaAdicional = valor;
    },
    setOpciones(state, valor) {
      state.opciones = valor;
    },
    setInvitadoApp(state, valor) {
      state.datosApp.invitado = valor;
    },
    setInvitados(state, valor) {
      state.invitados = valor;
    },
    setRespuestaCodigoInvitado(state, valor) {
      state.datosApp.respuesta.codigoInvitado = valor;
    },
    setRespuestaAnadirEvento(state, valor) {
      state.respuestaAnadirEvento = valor;
    },
    setRespuestaAnadirEmpresa(state, valor) {
      state.respuestaAnadirEmpresa = valor;
    },
    setRespuestaEditarEvento(state, valor) {
      state.respuestaEditarEvento = valor;
    },
  },
  actions: {
    async getEventos({commit, state}) {
      let list = [];
      let sessionEventos = localStorage.getItem('eventos');
      const lastGetEventos =  localStorage.getItem('lastGetEventos');

      if( (sessionEventos !== null && sessionEventos !== undefined) && moment().diff(lastGetEventos, "minutes") < 5){
        list = JSON.parse(sessionEventos);
        commit('setEventos', list);
      } else {
        await db
          .collection("eventos")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => list.push(doc.data())); 
            commit('setEventos', list);
            localStorage.setItem('eventos', JSON.stringify(list));
            const getTimeStamp = moment();
            localStorage.setItem('lastGetEventos', getTimeStamp);
        });
      }
    },

    async getEmpresas({commit}) {
      let list = [];
      let sessionEmpresas = localStorage.getItem('empresas');
      const lastGetEmpresas =  localStorage.getItem('lastGetEmpresas');

      if((sessionEmpresas !== null && sessionEmpresas !== undefined) && moment().diff(lastGetEmpresas, "minutes") < 5){
        list = JSON.parse(sessionEmpresas);
        commit('setEmpresas', list);
      } else {
        await db
          .collection("empresas")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => list.push(doc.data())); 
            commit('setEmpresas', list);
            localStorage.setItem('empresas', JSON.stringify(list));
            const getTimeStamp = moment();
            localStorage.setItem('lastGetEmpresas', getTimeStamp);
        });
      }
    },

    async getOpciones({commit}) {
      let opciones = [];

        await db
          .collection("opciones")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => opciones.push(doc.data())); 
            commit('setOpciones', opciones);
        });
    },

    async getEvento({commit}, data) {
      let evento = {};
      const idRuta = data;

        await db
          .collection("eventos")
          .where("id", "==", idRuta)
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => evento = doc.data()); 
            commit('setEvento', evento);
            localStorage.setItem('evento', JSON.stringify(evento));
        });
    },

    async getEmpresa({commit}, data) {
      let empresa = {};
      const idRuta = data;

        await db
          .collection("empresas")
          .where("id", "==", idRuta)
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => empresa = doc.data()); 
            commit('setEmpresa', empresa);
            localStorage.setItem('empresa', JSON.stringify(empresa));
        });
    },

    async getInvitados({commit}, data) {
      let invitados = [];
      const idRuta = data;

        await db
          .collection("invitados")
          .where("idEvento", "==", idRuta)
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => invitados.push(doc.data())); 
            commit('setInvitados', invitados);
            //localStorage.setItem('evento', JSON.stringify(evento));
        }); 
    },

    async getEmpleados({commit}, data) {
      let empleados = [];
      const idRuta = data;

        await db
          .collection("empleados")
          .where("idEmpresa", "==", idRuta)
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => empleados.push(doc.data())); 
            commit('setEmpleados', empleados);
            //localStorage.setItem('evento', JSON.stringify(evento));
        }); 
    },

    async addEvento({commit}, data) {
      let idFirebase = "";
      let fechaHoy = moment().format('DD/MM/YYYY');
      let horaHoy =  moment().format('LT');

      data.fechaRegistro = fechaHoy;
      data.horaRegistro = horaHoy;
      data.id = generateRandomId();

      await db
          .collection("eventos")
          .add(data)
          .then( async (snapshot) => {
            data.idFirebase = snapshot.id;

            let stringEvento = localStorage.getItem('eventos');
            let eventos = JSON.parse(stringEvento);
            eventos.unshift(data);
            localStorage.setItem('eventos', JSON.stringify(eventos));
            commit('setEventos', eventos);
            
            await db
            .collection("eventos")
            .doc(data.idFirebase)
            .update(data)
            .then((snapshot) => {
              commit('setRespuestaAnadirEvento', 'exito');
            });
          });
    },

    async addEmpresa({commit}, data) {
      let idFirebase = "";
      let fechaHoy = moment().format('DD/MM/YYYY');
      let horaHoy =  moment().format('LT');

      data.fechaRegistro = fechaHoy;
      data.horaRegistro = horaHoy;
      data.id = generateRandomId();

      await db
          .collection("empresas")
          .add(data)
          .then( async (snapshot) => {
            data.idFirebase = snapshot.id;

            let stringEmpresa = localStorage.getItem('empresas');
            let empresas = JSON.parse(stringEmpresa);
            empresas.unshift(data);
            localStorage.setItem('empresas', JSON.stringify(empresas));
            commit('setEmpresas', empresas);
            
            await db
            .collection("empresas")
            .doc(data.idFirebase)
            .update(data)
            .then((snapshot) => {
              commit('setRespuestaAnadirEmpresa', 'exito');
            });
          });
    },

    async updateLocation({commit}, data) {
      const coordinates = data[0];
      const type = data[1];
      if (type == 'evento') {
        commit('setLocation', coordinates);
      } else if (type == 'ceremonia') {
        commit('setLocationCeremony', coordinates);
      } else {
        commit('setLocationCeremonyAdd', coordinates);
      }
      
    },

    async updateEvento({commit}, data) {

      let fechaHoy = moment().format('DD/MM/YYYY');
      let horaHoy =  moment().format('LT');

      data.fechaActualizacion = fechaHoy;
      data.horaActualizacion = horaHoy;

      await db
          .collection("eventos")
          .doc(data.idFirebase)
          .update(data)
          .then((snapshot) => {
            commit('setRespuestaEditarEvento', 'exito');
          });
    },

    async updateEmpresa(state, data) {

      let fechaHoy = moment().format('DD/MM/YYYY');
      let horaHoy =  moment().format('LT');

      data.fechaActualizacion = fechaHoy;
      data.horaActualizacion = horaHoy;

      await db
          .collection("empresas")
          .doc(data.idFirebase)
          .update(data)
          .then((snapshot) => {
          });
    },

    async updateInvitado(state, data) {
      await db
          .collection("invitados")
          .doc(data.idFirebase)
          .update(data)
          .then((snapshot) => {
            return "success";
          });
    },

    async updateEmpleado(state, data) {
      await db
          .collection("empleados")
          .doc(data.idFirebase)
          .update(data)
          .then((snapshot) => {
            return "success";
          });
    },

    async addInvitado(state, data) {
      await db
          .collection("invitados")
          .add(data)
          .then( async (snapshot) => {
            data.idFirebase = snapshot.id;
            data.idInvitado = generateRandomId();
            
            await db
            .collection("invitados")
            .doc(data.idFirebase)
            .update(data)
            .then((snapshot) => {
              window.location.reload(true);
            });
          });
    },

    async addEmpleado(state, data) {
      await db
          .collection("empleados")
          .add(data)
          .then( async (snapshot) => {
            data.idFirebase = snapshot.id;
            data.idEmpleado = generateRandomId();
            
            await db
            .collection("empleados")
            .doc(data.idFirebase)
            .update(data)
            .then((snapshot) => {
              window.location.reload(true);
            });
          });
    },

    async getInvitadoById({commit}, data) {

      let evento = [];
      let invitado = [];

      await db
          .collection("invitados")
          .where("idInvitado", "==", data)
          .get()
          .then( async (snapshot) => {
            snapshot.docs.forEach((doc) => invitado.push(doc.data()));
            
            if(invitado.length > 0) {
              await db
              .collection("eventos")
              .where("id", "==", invitado[0].idEvento)
              .get()
              .then((snapshot) => {
                snapshot.docs.forEach((doc) => evento.push(doc.data())); 
                if(evento.length > 0 ) {
                  commit('setInvitadoApp', invitado[0]);
                  commit('setEventoApp', evento[0]);
                  commit('setBienvenida', false);
                  commit('setRespuestaCodigoInvitado', "exito");
                } else {
                  commit('setRespuestaCodigoInvitado', "fallo");
                }
              });
            } else {
              commit('setRespuestaCodigoInvitado', "fallo");
            }
        }); 

    },

    async confirmacionAsistencia({commit, state}, data) {
      const payload = {
        visibilidad: false,
        statusConfirmacion: data
      }

      commit('setConfirmacionAsistencia', payload)

      let invitado = state.datosApp.invitado

      invitado.statusConfirmacion = data

      await db
          .collection("invitados")
          .doc(invitado.idFirebase)
          .update(invitado)
          .then((snapshot) => {
            return "success";
      })
    },

    async numeroAsistentes(state, data) {
      let invitado = state.state.datosApp.invitado;

      invitado.totalAsistentes = data;
      invitado.isUpdated = true;

      await db
          .collection("invitados")
          .doc(invitado.idFirebase)
          .update(invitado)
          .then((snapshot) => {
            return "success";
      });
    },

    resetEvento({commit}) {
      let defaultValue = {
        ceremoniaAdicional: 'No',
        codigoVestimenta: 'Formal',
        tipoEvento: 'Boda Religiosa',
        nombreEvento: '',
        nombreCliente: '',
        numeroInvitaciones: 0,
        telefonoCliente: '',
        fechaEvento: '',
        docs: [],
        soloAdultos: false,
        fondo: 'fondoboda.jpeg',
        fuenteTitulo: "'Parisienne', cursive",
        fuenteCuerpo: "'Gilda Display', serif",
        tamanoFuenteTitulo: 30,
        tamanoFuenteCuerpo: 15,
        tema: {
          preview: 'spark-shine.png',
          nombre: 'Spark&Shine',
          fondo: 'background-gems.png',
        },
        textoLocacionEvento: "",
        textoLocacionCeremonia: "",
        textoLocacionCeremoniaAdicional: "",
        colorFuenteTitulo: "#333",
        colorFuenteCuerpo: "#333",
        locacionEvento: {
          lat: 20.967298,
          lng:-89.623639
        }, 
        locacionCeremonia: {
          lat: 20.967298,
          lng:-89.623639
        },
        locacionCeremoniaAdicional: {
          lat: 20.967298,
          lng:-89.623639
        }
      };

      commit('setEvento', defaultValue);
    }
  },
  getters:{ 
  },
  modules: {
  }
})
