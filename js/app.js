var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function(){
        return {
            visible: false
        };
    },

    readmoreClick: function(e){
        e.preventDefault();
        this.setState({visible: true})
    },

    render: function() {
        var author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;
        console.log('render',this); //добавили console.log
        return (
            <div className="article">
                <p className ='news__author'>{author}:</p>
                <p className ='news__text'>{text} </p>
                <a href="#" onClick={this.readmoreClick}
                   className={'news__readmore ' + (visible ? 'none' : '')}>
                    Подробнее</a>
                <p className={'news__bigText ' + (visible ? '' : 'none')}>
                    {bigText}</p>
            </div>
        )
    }
});

var News = React.createClass({

    render: function() {
        var data = this.props.data;
        var newsTemplate;

        if (data.length > 0) {
            newsTemplate = data.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article data={item}/>
                    </div>
                )
            })
        }
        else {
            newsTemplate = <p>Новостей нет</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong
                    className={data.length > 0 ? "" : "none"}>
                    Всего новостей: {data.length}
                    </strong>
            </div>
        );
    }
});

var AddNews = React.createClass({

    getInitialState: function(){
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        };
    },

    componentDidMount: function() { //ставим фокус в input
        ReactDOM.findDOMNode(this.refs.author).focus();
    },

    onBtnAlert: function(e){
        e.preventDefault();
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = ReactDOM.findDOMNode(this.refs.text).value;
        alert(author + '\n' + text);
    },

    onFieldChange: function(fieldName, e) {
        var next = {};
        if (e.target.value.trim().length > 0) {
            next[fieldName] = false;
            this.setState(next);
        } else {
            next[fieldName] = true;
            this.setState(next);
        }
    },

    onCheckRuleClick: function(e) {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked}); //устанавливаем значение в state
    },

    render: function() {
        var agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty;
        return (
            <form className='add cf'>
            <input className='add__author'
                   type='text'
                   onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                   placeholder='Ваше имя'
                   ref='author'
            />
                <textarea
                className='add__text'
                onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                placeholder='Текст новости'
                ref='text'
                ></textarea>
                <label className='add__checkrule'>
                    <input type='checkbox'
                           ref='checkrule'
                           onChange={this.onCheckRuleClick}
                    />Я согласен с правилами
                </label>
            <button className='add__btn'
                    onClick={this.onBtnAlert}
                    ref='alert_button'
                    disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
            >Вызвать Alert
            </button>
            </form>
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <h3>Новости</h3>
                <AddNews />
                <News data={my_news}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);