import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

import {ColDef, INumberFilterParams, ITextFilterParams} from 'ag-grid-community'
import {AgGridReact} from 'ag-grid-react'
import {useMemo, useRef, useState} from 'react'

import data from './olympic-data.json'
import {useAppDispatch, useAppSelector} from './store'
import {saveFilterModel} from './grid.slice'

type OlympicData = {
  athlete: string
  age: number | null
  country: string
  year: number
  date: string
  sport: string
  gold: number
  silver: number
  bronze: number
  total: number
}

export const App = () => {
  const gridRef = useRef<AgGridReact<OlympicData>>(null)
  const gridState = useAppSelector(state => state.grid)
  const dispatch = useAppDispatch()

  const [rowData] = useState<OlympicData[]>(data)
  const [columnDefs] = useState<ColDef[]>([
    {field: 'athlete'},
    {
      field: 'country',
      filterParams: {
        filterOptions: ['contains', 'startsWith', 'endsWith'],
        defaultOption: 'startsWith',
      } as ITextFilterParams,
    },
    {
      field: 'sport',
      filterParams: {
        maxNumConditions: 10,
      } as ITextFilterParams,
    },
    {
      field: 'age',
      filter: 'agNumberColumnFilter',
      filterParams: {
        numAlwaysVisibleConditions: 2,
        defaultJoinOperator: 'OR',
      } as INumberFilterParams,
      maxWidth: 100,
    },
  ])

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
    }
  }, [])

  const [textareaValue, setTextareaValue] = useState('')
  const [gridFilterModel, setGridFilterModel] = useState('')

  return (
    <div className="container">
      <div className="grid ag-theme-quartz-dark">
        <AgGridReact<OlympicData>
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onFilterChanged={({api}) =>
            setGridFilterModel(JSON.stringify(api.getFilterModel(), null, 2))
          }
        />
      </div>
      <div className="sidebar">
        <h3>Grid</h3>
        <pre>{gridFilterModel}</pre>
        <hr />

        <h3>Redux</h3>
        <pre>{JSON.stringify(gridState.filterModel, null, 2)}</pre>
        <hr />

        <h3>Input</h3>
        <textarea
          value={textareaValue}
          onChange={e => setTextareaValue(e.target.value)}
          placeholder="Enter filter model"
          rows={10}
        />
        <button
          type="button"
          onClick={() => dispatch(saveFilterModel(JSON.parse(textareaValue)))}
        >
          Update Redux state
        </button>

        <hr />

        <button
          type="button"
          onClick={() => {
            gridRef.current!.api.setFilterModel(gridState.filterModel)
          }}
        >
          Update Grid state from Redux
        </button>

        <button
          type="button"
          onClick={() => {
            const filterModelCopy = JSON.parse(
              JSON.stringify(gridState.filterModel),
            )
            gridRef.current!.api.setFilterModel(filterModelCopy)
          }}
        >
          Update Grid state from Redux
          <br /> (using deep copy)
        </button>

        <button onClick={() => gridRef.current!.api.setFilterModel(null)}>
          Reset Grid filters
        </button>
      </div>
    </div>
  )
}
