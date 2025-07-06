import { error } from "@sveltejs/kit"

const css={control:'',input:'',label:'',btnSubmit:'',card:'',panel:"",panel2:'',btn:"",btnPink:"",
    btnCancel:"",btnPurple:"",btnDelete:"",error:"",required:"",grid2:"",spinner:"",cardMax:"",route:"",table:"",
    tr:"",td:"",hr:"",a4:"",icon:"",
}

css.control = `grid grid-1 gap-1 mb-1`
css.label = 'text-slate-500'
css.input = `min-w-0 border border-slate-400 rounded p-1 px-2 focus:border-blue-600 focus:outline-none min-w-16`
css.btn = `p-2 min-w-20  text-white text-center font-bold rounded focus:outline-none `
css.btnSubmit = ` ${css.btn} bg-green-500 hover:bg-green-600 focus:bg-green-600 `
css.btnCancel = ` ${css.btn} bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 `
css.btnPink = ` ${css.btn} bg-pink-500 hover:bg-pink-600 focus:bg-pink-600 `
css.btnPurple = ` ${css.btn} bg-purple-500 hover:bg-purple-600 focus:bg-purple-600 `
css.btnDelete = ` ${css.btn} bg-red-500 hover:bg-red-600 focus:bg-red-600 `
css.card = `bg-white p-5 rounded-lg m-auto shadow-lg max-w-3xl`
css.cardMax = `bg-white p-8 rounded-lg m-auto shadow-lg`
css.panel = 'p-2 text-lg bg-purple-500 text-white font-bold text-center rounded-lg mb-2'
css.panel2 = 'p-1 text-white font-bold text-center rounded'
css.error = "p-3 text-red-500 font-bold"
css.required = "text-red-500 font-bold"
css.grid2 = "grid gap-x-3 sm:grid-cols-2"
css.spinner = "w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"
css.route="min-w-24 rounded-lg p-4 text-white font-bold text-center"
css.table="w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden mt-2"
css.tr="odd:bg-gray-100 even:bg-white border-b border-gray-300"
css.hr = "bg-purple-600 border-b border-gray-300 text-white font-bold"
css.td = "px-6 py-4"
css.a4 = "width: 794px; height: 1123px;"
css.icon=""
export default css



