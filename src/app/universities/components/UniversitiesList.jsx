"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useMemo, useEffect, useCallback } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, Select, SelectItem} from "@nextui-org/react";

import { countries } from '../data/countries';
import { formatNumber } from 'src/utils/number';
import { SearchIcon } from 'src/app/components/icons/SearchIcon';

export default function UniversitiesList(dataUniversities) {

	const router = useRouter()
	const searchParams = useSearchParams()

	const [defaultValueCountry, setDefaultValueCountry] = useState(new Set([searchParams.get('ctr')]))
	
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [page, setPage] = useState(Number(searchParams.get('page')));
  	const pages = Math.ceil(dataUniversities?.dataUniversities?.length / rowsPerPage);

	const [sortedBy, setSortedBy] = useState('ascending');

	const [filterValue, setFilterValue] = useState("");
	const hasSearchFilter = Boolean(filterValue);

	const [filterValueSeacrhUniversities, setFilterValueSeacrhAllUniversities] = useState("");

	const filteredItems = useMemo(() => {
		let filteredUniversities = [...dataUniversities?.dataUniversities];
	
		if (hasSearchFilter) {
		  filteredUniversities = filteredUniversities.filter((university) =>
			university.name.toLowerCase().includes(filterValue.toLowerCase()),
		  );
		}
	
		return filteredUniversities;
	}, [dataUniversities, filterValue]);

	const items = useMemo(() => {

		if (sortedBy === 'ascending') {
			const sortedItems = filteredItems?.sort((a, b) => {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			});
			const start = (page - 1) * rowsPerPage;
			const end = start + rowsPerPage;
		
			return sortedItems?.slice(start, end);
		} else {
			const sortedItems = filteredItems?.sort((a, b) => {
				if (a.name < b.name) return 1;
				if (a.name > b.name) return -1;
				return 0;
			});
			const start = (page - 1) * rowsPerPage;
			const end = start + rowsPerPage;
		
			return sortedItems?.slice(start, end);
		}

		
	}, [page, filteredItems, rowsPerPage, sortedBy]);

	const countriesList = useMemo(() => {
		const uniqueCountries = [...new Set(countries)];

		const sortedCountries = uniqueCountries?.sort((a, b) => {
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
			return 0;
		});
	
		return sortedCountries;
	}, []);

	const onRowsPerPageChange = useCallback((e) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);
	
	const onSearchChange = useCallback((value) => {
		if (value) {
		  setFilterValue(value);
		  setPage(1);
		} else {
		  setFilterValue("");
		}
	}, []);

	const onSearchChangeAllUniversities = useCallback((value) => {
		setFilterValueSeacrhAllUniversities(value)
	}, []);

	const handleSelectCountry = useCallback((e) => {
		if (e.target.value !== 'all') {
			// let filteredCountry = countries?.find((element) => element.id === e.target.value)

			router.push(`/universities?page=${page}&ctr=${e.target.value}`)
		} else {
			router.push(`/universities?page=${page}&ctr=all`)
		}
	}, [router, searchParams])

	const handleSortedBy = useCallback((e) => {
		setSortedBy(e.target.value)
	}, [])

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4 mt-1 w-full">
				<div className="flex w-full flex-wrap gap-y-3 justify-between items-center">
					<span className="text-default-400 text-small">Total {
						filterValue ? formatNumber(filteredItems?.length) + ' ' + "universities found" :
						formatNumber(dataUniversities?.dataUniversities?.length) + ' ' + "universities"
					}</span>
					<label className="flex items-center text-default-400 text-small">
						Rows per page:
						<select
							defaultValue={rowsPerPage}
							className="bg-transparent outline-none text-default-400 text-small cursor-pointer"
							onChange={onRowsPerPageChange}
						>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="20">20</option>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="75">75</option>
							<option value="100">100</option>
						</select>
					</label>
				</div>
				<div className="flex w-full md:flex-row flex-col justify-between gap-x-3 gap-y-7 items-end mb-2">
					<Input
						isClearable
						classNames={{
							base: "w-full md:max-w-[44%]",
							inputWrapper: "border-1",
						}}
						placeholder="Search University in this Table..."
						size="lg"
						startContent={<SearchIcon className="text-default-300" />}
						value={filterValue}
						variant="bordered"
						onClear={() => setFilterValue("")}
						onValueChange={onSearchChange}
					/>
					<div className="flex sm:flex-row flex-col w-full gap-x-2 gap-y-6">
						{
							!searchParams.get('q') &&
							<Select
								size='lg'
								selectedKeys={defaultValueCountry}
								onSelectionChange={setDefaultValueCountry}
								className="w-full"
								onChange={handleSelectCountry}
								placeholder="Select a country"
								aria-labelledby='Select Country'
							>
								<SelectItem key='all' value='all'>
									All
								</SelectItem>
								{countriesList.map((country) => (
									<SelectItem key={country.name} value={country.name}>
										{country.name}
									</SelectItem>
								))}
							</Select>
						}
						<Select
							size='lg'
							className="w-full"
							onChange={handleSortedBy}
							placeholder="Sorted by"
							aria-labelledby='Sorted by'
						>
							<SelectItem key='ascending' value='ascending'>
								Ascending
							</SelectItem>
							<SelectItem key='descending' value='descending'>
								Descending
							</SelectItem>
						</Select>
					</div>
				</div>
			</div>
		);
	}, [
		filterValue,
		onSearchChange,
		onRowsPerPageChange,
		dataUniversities?.dataUniversities?.length,
		hasSearchFilter,
	]);

	const bottomContent = useMemo(() => {
		return (
			<div className="flex w-full justify-end mt-2">
				<Pagination
					page={page}
					showControls
					total={pages}
					color="primary"
					variant="light"
					isDisabled={hasSearchFilter}
					onChange={(page) => {
						setPage(page)
						router.push(`/universities?page=${page}&ctr=${searchParams.get('ctr')}`)
					}}
				/>
			</div>
		);
	}, [items.length, page, pages, hasSearchFilter]);

	useEffect(() => {
		if(searchParams.get('ctr') === '') {
			router.push(`/universities?page=${page}&ctr=Indonesia`)
		}
	}, [searchParams, router])

	return (
		<>
			<form onSubmit={(event) => {
				event?.preventDefault()
				router.push(`/universities?page=1&q=${filterValueSeacrhUniversities?.toLocaleLowerCase()}`)
			}}>
				<Input
					value={filterValueSeacrhUniversities}
					defaultValue={searchParams.get('q') !== '' && searchParams.get('q')}
					isClearable
					classNames={{
						base: "w-full sm:max-w-[44%] mb-8",
						inputWrapper: "border-1",
					}}
					placeholder="Search Universities..."
					size="lg"
					startContent={<SearchIcon className="text-default-300" />}
					variant="bordered"
					onClear={() => {
						setFilterValueSeacrhAllUniversities("")
						router.push(`/universities?page=1&ctr=Indonesia`)
					}}
					onValueChange={onSearchChangeAllUniversities}
					description="Please press 'Enter' to search universities."
				/>
			</form>
			<Table 
				isStriped
				topContent={topContent}
				topContentPlacement="outside"
				bottomContent={bottomContent}
				aria-label="Universities List"
				bottomContentPlacement="outside"
				classNames={{
					wrapper: "min-h-[290px]",
				}}
			>
				<TableHeader>
					<TableColumn key="name">NAME</TableColumn>
					<TableColumn key="state-province">STATE</TableColumn>
					<TableColumn key="country">COUNTRY</TableColumn>
					<TableColumn key="alpha_two_code">CODE</TableColumn>
					<TableColumn key="web_pages">WEBSITE</TableColumn>
				</TableHeader>
				<TableBody emptyContent={"No universities found"} items={items}>
					{(item) => (
						<TableRow key={item.name}>
							<TableCell>{item?.name}</TableCell>
							<TableCell>{!item['state-province'] ? 'Nothing' : item['state-province']}</TableCell>
							<TableCell>{item?.country}</TableCell>
							<TableCell>{item?.alpha_two_code}</TableCell>
							<TableCell>
								<a href={item?.web_pages} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">
									{item?.web_pages}
								</a>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
}