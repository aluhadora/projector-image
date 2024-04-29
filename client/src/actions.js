export default function buildActions(state, sendMessage, callbacks) {
    const actions = [
        {
          display: "Refresh Clients",
          smallsrc: "images/icons/refresh.png",
          action: () => sendMessage({refresh: true}),
        },
        { 
          display: "Go Offline",
          smallsrc: "images/icons/right.png",
          action: () => window.location.href = '/offline'
        },
        { 
          display: "Go reduced",
          smallsrc: "images/icons/right.png",
          action: () => window.location.href = '/reducedselector'
        },
        // {
        //   display: state.show3d ? "Turn off 3d" : "Turn on 3d",
        //   smallsrc: "images/icons/right.png",
        //   action: () => sendMessage({show3d: !state.show3d})
        // },
        // {
        //   display: state.pointLight ? "Switch to ambient" : "Switch to point light",
        //   smallsrc: "images/icons/right.png",
        //   action: () => sendMessage({pointLight: !state.pointLight})
        // },
        {
          display: state.showStarfield ? "Hide Starfield" : "Show Starfield",
          smallsrc: "images/icons/right.png",
          action: () => sendMessage({showStarfield: !state.showStarfield})
        },
        {
          display: state.showMoons ? "Hide Moons" : "Show Moons",
          smallsrc: "images/icons/right.png",
          action: () => sendMessage({showMoons: !state.showMoons})
        },
        {
          display: "Call hook",
          smallsrc: "images/icons/right.png",
          action: () => callbacks.stuff("stuff")
        }
      ];

      return actions;
}