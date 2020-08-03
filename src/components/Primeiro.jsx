import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';

class Primeiro extends Component {
    personagens = [];
    planetas = [];
    filmes = [];

    constructor(props) {
        super(props);
        this.personagens = [];
        this.planetas = [];
        this.filmes = [];
        this.state = {
            personagens: [],
            planetas: [],
            filmes: [],
            pesquisa: '',
            tipo: 'name',
            aba:'planetas'
        }
        this.getPlanetas();
        this.getPersonagens();
        this.getFilmes();
        this.abaActive = this.abaActive.bind(this);
        this.abaPlanetas = this.abaPlanetas.bind(this);
        this.abaPersonagens = this.abaPersonagens.bind(this);
        this.abaFilmes = this.abaFilmes.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    getPlanetas() {
        fetch("http://swapi.dev/api/planets/")
        .then(res => res.json())
        .then((data) => {
            this.setState({planetas: data.results});
            this.planetas = data.results;
        })
    }

    getPersonagens() {
        fetch("http://swapi.dev/api/people/")
        .then(res => res.json())
        .then((data) => {
            this.setState({personagens: data.results});
            this.personagens = data.results;
        })
    }

    getFilmes() {
        fetch("http://swapi.dev/api/films/")
        .then(res => res.json())
        .then((data) => {
            this.setState({filmes: data.results});
            this.filmes = data.results;
        })
    }

    onChange = e => {
        this.setState({ pesquisa: e.target.value });
        if (this.state.aba == 'planetas')
            this.planetas = this.state.planetas.filter((planet) => planet[this.state.tipo].indexOf(this.state.pesquisa) >= 0 || this.state.pesquisa.length == 0);
        else if (this.state.aba == 'personagens')
            this.personagens = this.state.personagens.filter((person) => person[this.state.tipo].indexOf(this.state.pesquisa) >= 0 || this.state.pesquisa.length == 0);
        else if (this.state.aba == 'filmes')
            this.filmes = this.state.filmes.filter((planet) => planet[this.state.tipo].indexOf(this.state.pesquisa) >= 0 || this.state.pesquisa.length == 0);
    }
    onChangeTipo = e => this.setState({ tipo: e.target.value })
    

    abaActive(event) {
        if (this.aba == 'filmes') {
            this.setState({tipo:'title'});
        }

        var ul = document.querySelectorAll('.nav-item a');
        ul.forEach((el) => {
            el.classList.remove("active");
            document.querySelector('#' + el.getAttribute('data')).style.display="none";
        })
        event.currentTarget.classList.add("active");
        this.setState({aba: event.currentTarget.getAttribute('data')});
        document.querySelector('#' + event.currentTarget.getAttribute('data')).style.display="";
    }

    abaPlanetas() {
        var ul = document.querySelectorAll('.nav-item a');
        ul.forEach((el) => {
            if (el.getAttribute('data') == 'planetas') {
                document.querySelector('#planetas').style.display="";
                el.classList.add("active");
                this.setState({aba: 'planetas'});
            } else {
                document.querySelector('#' + el.getAttribute('data')).style.display="none";
                el.classList.remove("active");
            }
        })
    }

    abaPersonagens() {
        var ul = document.querySelectorAll('.nav-item a');
        ul.forEach((el) => {
            if (el.getAttribute('data') == 'personagens') {
                document.querySelector('#personagens').style.display="";
                el.classList.add("active");
                this.setState({aba: 'personagens'});
            } else {
                document.querySelector('#' + el.getAttribute('data')).style.display="none";
                el.classList.remove("active");
            }
        })
    }

    abaFilmes() {
        var ul = document.querySelectorAll('.nav-item a');
        ul.forEach((el) => {
            if (el.getAttribute('data') == 'filmes') {
                document.querySelector('#filmes').style.display="";
                el.classList.add("active");
                this.setState({aba: 'filmes'});
            } else {
                document.querySelector('#' + el.getAttribute('data')).style.display="none";
                el.classList.remove("active");
            }
        })
    }

    render() {
        const hide = {
            display: 'none'
        };
        const listPlanetas = this.planetas.map((data, idx) => {
            return <tr key={idx}><td>{data.name}</td><td>{data.population}</td><td>{data.climate}</td></tr>
        })
        const listPersonagens = this.personagens.map((data, idx) => {
            return <tr key={idx}><td>{data.name}</td><td>{data.gender}</td></tr>
        })
        const listFilmes = this.filmes.map((data, idx) => {
            return <tr key={idx}><td>{data.title}</td><td>{data.episode_id}</td><td>{data.opening_crawl}</td><td>{data.release_date}</td><td><button onClick={this.abaPersonagens} className="btn btn-primary">Personagens</button></td><td><button onClick={this.abaPlanetas} className="btn btn-primary">Planetas</button></td></tr>
        })
        return (
            <>
            <nav className="nav nav-pills">
                <li className="nav-item">
                    <a onClick={this.abaActive} data="planetas" className="nav-link active" href="#">Planetas</a>
                </li>
                <li className="nav-item">
                    <a onClick={this.abaActive} data="personagens" className="nav-link" href="#">Personagens</a>
                </li>
                <li className="nav-item">
                    <a onClick={this.abaActive} data="filmes" className="nav-link" href="#">Filmes</a>
                </li> 
            </nav>
            <div className="table-responsive">
                
                <div id="planetas">
                    <table className="table table-striped table-dark table-hover">
                    <thead className="thead-dark">
                        <tr><th colSpan={3}>Lista de planetas</th></tr>
                        <tr> 
                            <th colSpan={3}>
                                <input className="form-control" onChange={this.onChange} onBlur={this.onChange} type="text" placeholder="Pesquisar" />
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" onChange={this.onChangeTipo} type="radio" name="opcaoPlaneta" id="planetaNome" value="name" checked={this.state.tipo == 'name'} />
                                    <label className="form-check-label" for="planetaNome">
                                        Nome
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" onChange={this.onChangeTipo} type="radio" name="opcaoPlaneta" id="planetaPopulacao" value="population" checked={this.state.tipo == 'population'} />
                                    <label className="form-check-label" for="planetaPopulacao">
                                        População
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" onChange={this.onChangeTipo} type="radio" name="opcaoPlaneta" id="planetaClima" value="climate" checked={this.state.tipo == 'climate'} />
                                    <label className="form-check-label" for="planetaClima">
                                        Clima
                                    </label>
                                </div>
                            </th>
                        </tr>
                        <tr id="responsive"><th>Planeta</th><th>População</th><th>Clima</th></tr>
                    </thead>
                    <tbody>
                        {listPlanetas}
                    </tbody>
                    </table>
                </div>
                <div id="personagens" style={hide}>
                    <table className="table table-striped table-dark table-hover">
                    <thead className="thead-dark">
                        <tr><th colSpan={2}>Lista de Personagens</th></tr>
                        <tr> 
                            <th colSpan={3}>
                                <input className="form-control" onChange={this.onChange} onBlur={this.onChange} type="text" placeholder="Pesquisar" />
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" onChange={this.onChangeTipo} type="radio" name="opcaoPersonagens" id="PersonagensNome" value="name" checked={this.state.tipo == 'name'} />
                                    <label className="form-check-label" for="PersonagensNome">
                                        Nome
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" onChange={this.onChangeTipo} type="radio" name="opcaoPersonagens" id="PersonagensPopulacao" value="gender" checked={this.state.tipo == 'gender'} />
                                    <label className="form-check-label" for="PersonagensPopulacao">
                                        Gênero
                                    </label>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="responsive"><th>Nome</th><th>Gênero</th></tr>
                        {listPersonagens}
                    </tbody>
                    </table>
                </div>
                <div id="filmes" style={hide}>
                    <table className="table table-striped table-dark table-hover">
                    <thead className="thead-dark">
                        <tr><th colSpan={6}>Lista de Filmes</th></tr>
                        <tr> 
                            <th colSpan={6}>
                                <input className="form-control" onChange={this.onChange} onBlur={this.onChange} type="text" placeholder="Pesquisar" />
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" onChange={this.onChangeTipo} type="radio" name="opcaoFilmes" id="FilmesNome" value="title" checked={this.state.tipo == 'title'} />
                                    <label className="form-check-label" for="FilmesNome">
                                        Nome
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" onChange={this.onChangeTipo} type="radio" name="opcaoFilmes" id="FilmesPopulacao" value="release_date" checked={this.state.tipo == 'release_date'} />
                                    <label className="form-check-label" for="FilmesPopulacao">
                                        Ano de lançamento
                                    </label>
                                </div>
                            </th>
                        </tr>
                    </thead> 
                    <tbody> 
                        <tr id="responsive"><th>Título</th><th>Episódio</th><th>Texto de abertura</th><th>Ano Lanc.</th><th>Personagens</th><th>Planetas</th></tr>
                        {listFilmes}
                    </tbody>
                    </table>
                </div>
            </div>
            </>
        )
    }

}

export default Primeiro;